<?php
if (!defined('ABSPATH')) exit;

/**
 * Seeds the pages described in content.json on theme activation.
 *
 * content.json shape:
 *   { "slug": { "title": "...", "description": "...", "content": "<html>", "faq": [ {"q":"","a":""} ] } }
 *
 * Existing pages with the same slug are never overwritten.
 */
function lm_seed_pages() {
    $data = lm_content();
    if (!$data) return;

    $home_id = 0;

    foreach ($data as $slug => $item) {
        $title   = isset($item['title']) ? $item['title'] : ucfirst($slug);
        $body    = isset($item['content']) ? $item['content'] : '';
        $desc    = isset($item['description']) ? $item['description'] : '';
        $faq     = isset($item['faq']) && is_array($item['faq']) ? $item['faq'] : array();

        $existing = get_page_by_path($slug);
        if ($existing) {
            if ($slug === 'home') $home_id = $existing->ID;
            continue;
        }

        $id = wp_insert_post(array(
            'post_type'    => 'page',
            'post_status'  => 'publish',
            'post_name'    => $slug,
            'post_title'   => $title,
            'post_content' => $body,
        ));

        if (!is_wp_error($id) && $id) {
            if ($desc) update_post_meta($id, '_lm_description', $desc);
            if ($faq)  update_post_meta($id, '_lm_faq', wp_json_encode($faq));
            if ($slug === 'home') $home_id = $id;
        }
    }

    if ($home_id && get_option('show_on_front') !== 'page') {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $home_id);
    }
}
