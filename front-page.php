<?php

$podargs = array(
	'post_type' => 'work',
	'order'		=> 'ASC'
);

$context          			= Timber::context();
$context['posts'] 			= new Timber\PostQuery($podargs);
$timber_post_work 			= new Timber\Post();
$timber_post_webdesign 		= new Timber\Post();
$context['post_work'] 		= $timber_post_work;
$context['post_webdesign']	= $timber_post_webdesign;

Timber::render( 'front-page.twig', $context);