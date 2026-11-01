<?php
if (!defined('ABSPATH')) exit;

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('automatic-feed-links');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', array('search-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));
});

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('leads-mania', get_stylesheet_uri(), array(), '1.1');
});

/* -------------------------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------------------- */

function lm_url($slug = '') {
    return esc_url(home_url('/' . trim($slug, '/') . ($slug ? '/' : '')));
}

function lm_affiliate() {
    return 'https://snov.io?fp_ref=mrck20';
}

function lm_button($label = 'Try Snov.io Free') {
    return '<a class="button" href="' . esc_url(lm_affiliate()) . '" target="_blank" rel="sponsored nofollow noopener">'
        . esc_html($label) . ' <span aria-hidden="true">↗</span></a>';
}

/** Cached decode of content.json — the single source of truth for seeded copy. */
function lm_content() {
    static $data = null;
    if ($data === null) {
        $file = get_template_directory() . '/content.json';
        $data = file_exists($file) ? json_decode(file_get_contents($file), true) : array();
        if (!is_array($data)) $data = array();
    }
    return $data;
}

function lm_content_item($slug) {
    $data = lm_content();
    return isset($data[$slug]) ? $data[$slug] : null;
}

/** Slug of the page currently being viewed (empty on non-singular views). */
function lm_current_slug() {
    if (is_front_page()) return 'home';
    if (is_singular()) return get_post_field('post_name', get_queried_object_id());
    return '';
}

/** Meta description for the current view. */
function lm_description() {
    if (is_singular()) {
        $desc = get_post_meta(get_queried_object_id(), '_lm_description', true);
        if ($desc) return $desc;
    }
    $item = lm_content_item(lm_current_slug() ?: 'home');
    if ($item && !empty($item['description'])) return $item['description'];
    return get_bloginfo('description');
}

function lm_faq($slug = '') {
    $slug = $slug ?: lm_current_slug();
    $item = lm_content_item($slug);
    return ($item && !empty($item['faq']) && is_array($item['faq'])) ? $item['faq'] : array();
}

/** Visible FAQ block. Question text is rendered exactly as it appears in JSON-LD. */
function lm_faq_html($slug = '') {
    $faq = lm_faq($slug);
    if (!$faq) return '';
    $out = '<section class="faq"><h2>Frequently asked questions</h2>';
    foreach ($faq as $row) {
        $out .= '<h3>' . esc_html($row['q']) . '</h3><p>' . esc_html($row['a']) . '</p>';
    }
    return $out . '</section>';
}

function lm_author_box() {
    return '<aside class="author-box"><div class="avatar" aria-hidden="true">LM</div><div><strong>Leads Mania Editorial</strong>'
        . '<p>Research-based reviews of lead generation and cold outreach software. Every factual claim is cited to its source, and no testing claims are made that we have not performed. '
        . '<a href="' . lm_url('how-we-research') . '">How we research →</a></p></div></aside>';
}

/* -------------------------------------------------------------------------
 * Document title: the front page uses the SEO title from content.json rather
 * than the WordPress page title ("Home").
 * ---------------------------------------------------------------------- */
add_filter('document_title_parts', function ($parts) {
    if (is_front_page()) {
        $item = lm_content_item('home');
        if ($item && !empty($item['title'])) $parts['title'] = $item['title'];
    }
    return $parts;
});

add_filter('document_title_separator', function () { return '|'; });

/* -------------------------------------------------------------------------
 * <head>: description, canonical, Open Graph, Twitter cards
 * ---------------------------------------------------------------------- */
remove_action('wp_head', 'rel_canonical');

add_action('wp_head', function () {
    $desc = lm_description();
    $slug = lm_current_slug();
    $canonical = $slug && $slug !== 'home' ? lm_url($slug) : home_url('/');
    $title = is_front_page()
        ? (($item = lm_content_item('home')) ? $item['title'] : get_bloginfo('name'))
        : wp_get_document_title();
    $image = get_template_directory_uri() . '/og-image.png';

    if ($desc) {
        echo '<meta name="description" content="' . esc_attr($desc) . '">' . "\n";
    }
    echo '<link rel="canonical" href="' . esc_url($canonical) . '">' . "\n";
    echo '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">' . "\n";

    echo '<meta property="og:type" content="' . (is_front_page() ? 'website' : 'article') . '">' . "\n";
    echo '<meta property="og:locale" content="' . esc_attr(get_locale()) . '">' . "\n";
    echo '<meta property="og:site_name" content="' . esc_attr(get_bloginfo('name')) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($title) . '">' . "\n";
    if ($desc) echo '<meta property="og:description" content="' . esc_attr($desc) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($canonical) . '">' . "\n";
    echo '<meta property="og:image" content="' . esc_url($image) . '">' . "\n";
    echo '<meta property="og:image:width" content="1200">' . "\n";
    echo '<meta property="og:image:height" content="630">' . "\n";

    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($title) . '">' . "\n";
    if ($desc) echo '<meta name="twitter:description" content="' . esc_attr($desc) . '">' . "\n";
    echo '<meta name="twitter:image" content="' . esc_url($image) . '">' . "\n";
}, 1);

/* -------------------------------------------------------------------------
 * JSON-LD. Deliberately no Review / AggregateRating: we have not tested these
 * products, and inventing a rating violates Google's structured data policy.
 * ---------------------------------------------------------------------- */
add_action('wp_head', function () {
    $home = home_url('/');
    $blog = get_bloginfo('name');
    $desc = get_bloginfo('description');
    $graph = array();

    $graph[] = array(
        '@type' => 'Organization',
        '@id'   => $home . '#organization',
        'name'  => $blog,
        'url'   => $home,
        'description' => $desc,
        'logo'  => array('@type' => 'ImageObject', 'url' => get_template_directory_uri() . '/og-image.png'),
    );

    $graph[] = array(
        '@type' => 'WebSite',
        '@id'   => $home . '#website',
        'url'   => $home,
        'name'  => $blog,
        'description' => $desc,
        'publisher' => array('@id' => $home . '#organization'),
        'inLanguage' => get_bloginfo('language'),
    );

    if (is_singular()) {
        $id = get_queried_object_id();
        $slug = lm_current_slug();
        $permalink = get_permalink($id);
        $faq = lm_faq($slug);

        if ($slug !== 'home') {
            $graph[] = array(
                '@type' => 'BreadcrumbList',
                'itemListElement' => array(
                    array('@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => $home),
                    array('@type' => 'ListItem', 'position' => 2, 'name' => get_the_title($id), 'item' => $permalink),
                ),
            );
        }

        $graph[] = array(
            '@type' => 'Article',
            '@id'   => $permalink . '#article',
            'headline' => is_front_page() ? (($i = lm_content_item('home')) ? $i['title'] : $blog) : get_the_title($id),
            'description' => lm_description(),
            'inLanguage' => get_bloginfo('language'),
            'wordCount' => str_word_count(wp_strip_all_tags(get_post_field('post_content', $id))),
            'datePublished' => get_the_date('c', $id),
            'dateModified' => get_the_modified_date('c', $id),
            'mainEntityOfPage' => array('@type' => 'WebPage', '@id' => $permalink),
            'author' => array('@id' => $home . '#organization'),
            'publisher' => array('@id' => $home . '#organization'),
            'isAccessibleForFree' => true,
        );

        if ($faq) {
            $entities = array();
            foreach ($faq as $row) {
                $entities[] = array(
                    '@type' => 'Question',
                    'name' => $row['q'],
                    'acceptedAnswer' => array('@type' => 'Answer', 'text' => $row['a']),
                );
            }
            $graph[] = array('@type' => 'FAQPage', 'mainEntity' => $entities);
        }
    }

    echo '<script type="application/ld+json">'
        . wp_json_encode(array('@context' => 'https://schema.org', '@graph' => $graph), JSON_UNESCAPED_SLASHES)
        . '</script>' . "\n";
}, 2);

/* -------------------------------------------------------------------------
 * robots.txt — point crawlers at the sitemap.
 * ---------------------------------------------------------------------- */
add_filter('robots_txt', function ($output, $public) {
    if ($public) {
        $output .= "\nSitemap: " . home_url('/wp-sitemap.xml') . "\n";
    }
    return $output;
}, 10, 2);

/* Make sure the seeded pages appear in the core sitemap. */
add_filter('wp_sitemaps_post_types', function ($types) {
    if (isset($types['page'])) $types['page']->public = true;
    return $types;
});

/* -------------------------------------------------------------------------
 * Explainer diagrams: [fig:slug]
 * Files and their alt/caption text live in assets/figures (figures.json is
 * written by the build). Inline SVG-as-<img> keeps them cacheable and lets us
 * ship real alt text and intrinsic dimensions, which avoids layout shift.
 * ---------------------------------------------------------------------- */
function lm_figures() {
    static $manifest = null;
    if ($manifest === null) {
        $file = get_template_directory() . '/assets/figures/figures.json';
        $manifest = file_exists($file) ? json_decode(file_get_contents($file), true) : array();
        if (!is_array($manifest)) $manifest = array();
    }
    return $manifest;
}

function lm_figure($slug) {
    $all = lm_figures();
    if (!isset($all[$slug])) return '';

    $fig = $all[$slug];
    $src = get_template_directory_uri() . '/assets/figures/' . $slug . '.svg';
    $w   = isset($fig['w']) ? (int) $fig['w'] : 800;
    $h   = isset($fig['h']) ? (int) $fig['h'] : 300;

    return '<figure class="fig"><img src="' . esc_url($src) . '" alt="' . esc_attr($fig['alt'])
        . '" width="' . $w . '" height="' . $h . '" loading="lazy" decoding="async">'
        . (!empty($fig['caption']) ? '<figcaption>' . esc_html($fig['caption']) . '</figcaption>' : '')
        . '</figure>';
}

add_shortcode('fig', function ($atts) {
    $atts = shortcode_atts(array('name' => ''), $atts);
    return lm_figure($atts['name']);
});

/** Trust bar: real, checkable claims only. */
function lm_trust_bar() {
    $icons = array(
        'search' => '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
        'shield' => '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
        'check'  => '<path d="M20 6 9 17l-5-5"/>',
        'clock'  => '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    );
    $items = array(
        'search' => 'Research-based, sources cited',
        'shield' => 'No paid placements',
        'check'  => 'Independently owned',
        'clock'  => 'Reviewed ' . date_i18n('j M Y'),
    );
    $out = '<div class="trust-bar"><div class="wrap">';
    foreach ($items as $key => $label) {
        $out .= '<span><i><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
            . $icons[$key] . '</svg></i>' . esc_html($label) . '</span>';
    }
    return $out . '</div></div>';
}

/* -------------------------------------------------------------------------
 * Content shortcodes
 * ---------------------------------------------------------------------- */
add_filter('the_content', function ($content) {
    $content = preg_replace_callback('/\[url:([a-z0-9-]+)\]/', function ($m) {
        return lm_url($m[1]);
    }, $content);
    $content = preg_replace_callback('/\[affiliate:([^\]]+)\]/', function ($m) {
        return lm_button($m[1]);
    }, $content);
    $content = preg_replace_callback('/\[fig:([a-z0-9-]+)\]/', function ($m) {
        return lm_figure($m[1]);
    }, $content);
    return $content;
}, 9);

add_filter('the_content', 'lm_enhance_tables', 12);

/* -------------------------------------------------------------------------
 * Responsive tables.
 * A wide table cannot shrink below its content, so on a phone it forces the
 * whole page to scroll sideways. Stamp data-label on each cell and wrap the
 * table so CSS can restack it as a labelled card list below 650px.
 * ---------------------------------------------------------------------- */
function lm_enhance_tables($content) {
    if (strpos($content, '<table') === false) return $content;

    return preg_replace_callback('/<table>(.*?)<\/table>/s', function ($m) {
        $inner = $m[1];

        preg_match_all('/<th[^>]*>(.*?)<\/th>/s', $inner, $th);
        $heads = array_map(function ($h) {
            return trim(wp_strip_all_tags($h));
        }, isset($th[1]) ? $th[1] : array());

        $inner = preg_replace_callback('/<tr>(.*?)<\/tr>/s', function ($row) use ($heads) {
            if (strpos($row[1], '<th') !== false) return $row[0];

            $i = 0;
            $cells = preg_replace_callback('/<td([^>]*)>(.*?)<\/td>/s', function ($cell) use (&$i, $heads) {
                $label = isset($heads[$i]) ? $heads[$i] : '';
                $i++;
                return '<td' . $cell[1] . ' data-label="' . esc_attr($label) . '">' . $cell[2] . '</td>';
            }, $row[1]);

            return '<tr>' . $cells . '</tr>';
        }, $inner);

        return '<div class="table-scroll"><table>' . $inner . '</table></div>';
    }, $content);
}

require_once get_template_directory() . '/seed.php';
add_action('after_switch_theme', 'lm_seed_pages');
