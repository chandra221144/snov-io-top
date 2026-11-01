<?php get_header(); ?>
<div class="wrap article">
<?php if (have_posts()): while (have_posts()): the_post(); $lm_slug = get_post_field('post_name', get_the_ID()); ?>
  <nav class="breadcrumb" aria-label="Breadcrumb"><a href="<?php echo lm_url(); ?>">Home</a> / <span><?php the_title(); ?></span></nav>
  <h1><?php the_title(); ?></h1>
  <?php if (is_page() && !in_array($lm_slug, array('about','contact','affiliate-disclosure','privacy-policy','how-we-research'))): ?>
    <p class="notice">Some links may be affiliate links. We may earn a commission at no extra cost to you. <a href="<?php echo lm_url('affiliate-disclosure'); ?>">Learn more</a>.</p>
  <?php endif; ?>
  <?php if (!in_array($lm_slug, array('contact','affiliate-disclosure','privacy-policy'))): ?>
    <p class="meta-line">Reviewed <?php echo esc_html(get_the_modified_date('j F Y')); ?> · Research-based · Sources cited</p>
  <?php endif; ?>
  <div class="content"><?php the_content(); ?></div>
  <?php if (!in_array($lm_slug, array('contact','affiliate-disclosure','privacy-policy'))): ?>
    <?php echo lm_author_box(); ?>
  <?php endif; ?>
  <?php echo lm_faq_html($lm_slug); ?>
<?php endwhile; else: ?>
  <h1>Nothing found</h1>
  <p>Try exploring our <a href="<?php echo lm_url('guides'); ?>">guides</a> or the <a href="<?php echo lm_url('comparisons'); ?>">comparisons</a>.</p>
<?php endif; ?>
</div>
<?php get_footer(); ?>
