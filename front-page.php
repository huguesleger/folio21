<?php

$context          = Timber::context();
$context['posts'] = new Timber\PostQuery();
Timber::render( 'front-page.twig', $context );