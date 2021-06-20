<?php

$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

// Timber::$dirname = array( 'templates', 'views' );
Timber::$dirname = ['dist/templates'];

Timber::$autoescape = false;

class hlPortfolio extends Timber\Site {

	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}

		/** This is where you can register custom post types. */
		public function register_post_types() {

			function work() {
				$labels = array(
					'name'               => 'Projets',
					'singular_name'      => 'Projet',
					'menu_name'          => 'Projets',
					'name_admin_bar'     => 'Projets',
					'add_new'            => 'Ajouter un nouveau projet',
					'add_new_item'       => 'Ajouter un projet',
					'new_item'           => 'Nouveau projet',
					'edit_item'          => 'Editer un projet',
					'view_item'          => 'Voir un projet',
					'all_items'          => 'Tous les projets',
					'search_items'       => 'Rechercher un projet',
					'parent_item_colon'  => 'Parent Item',
					'not_found'          => 'Aucun projet',
					'not_found_in_trash' => 'Aucun projet dans la corbeille'
				);
				$args = array(
					'labels'             => $labels,
					'description'        => __( 'Description.', 'your-plugin-textdomain' ),
				  'public'             => true,
					'publicly_queryable' => true,
					'show_ui'            => true,
					'show_in_menu'       => true,
					'show_in_rest'       => true,
					'query_var'          => true,
				  	'rewrite'            => array( 'slug' => 'projet' ),
					'capability_type'    => 'post',
					'menu_icon'          => 'dashicons-images-alt2',
					'has_archive'        => false,
					'hierarchical'       => true,
					'menu_position'      => 5,
					'supports'           => array( 'title', 'editor', 'author', 'excerpt', 'thumbnail','revisions','page-attributes'),
				);

				register_post_type( 'work', $args );								
			}
			work();
		}

        /** This is where you can register custom taxonomies. */
        public function register_taxonomies() {

			function category() {
				$labels = array(
					'name'=>'Catégories',
					'singular_name'=>'Catégorie',
					'search_items'=>'Rechercher des catégories',
					'all_items'=>'Toute les catégories',
					'parent_item'=>'Catégorie parent',
					'parent_item_colon'=>'Catégorie parent:',
					'edit_item'=>'Editer une catégorie',
					'update_item'=> 'Mettre à jour une catégorie',
					'add_new_item'=>'Ajouter une nouvelle catégorie',
					'new_item_name'=>'Nom de la nouvelle catégorie',
					'menu_name'=>'Catégories'
				);
				$args = array(
						'hierarchical'=> true,
						'labels'=>$labels,
						'show_ui'=> true,
						'show_in_rest'=> true,
						'show_admin_column'=>true,
						'query_var'=> true,
						'rewrite'=> array( 'slug' => 'category-type' )
				);

				register_taxonomy('category-type', array('work'), $args);				
			}
			category();
        }

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['menu']  = new Timber\Menu();
		$context['site']  = $this;
		$custom_logo_url = wp_get_attachment_image_url( get_theme_mod( 'custom_logo' ), 'full' );
		$context['custom_logo_url'] = $custom_logo_url;
		return $context;
	}

	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
		add_theme_support( 'title-tag' );

		/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
		add_theme_support( 'post-thumbnails' );

		/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		* Enable support for Post Formats.
		*
		* See: https://codex.wordpress.org/Post_Formats
		*/
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );

		/*
		* logo custum
		*/
		add_theme_support('custom-logo',array(
			'flex-height' => true,
		));
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		$twig->addFilter( new Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}
}
new hlPortfolio();
	/**
	 * Load Google Fonts from CDN.
	 */
	function wpdd_google_fonts() {
		$google_fonts_url = 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap';
		?>
		
		<link rel="preconnect"
			href="https://fonts.gstatic.com"
			crossorigin />
	
		<link rel="preload"
			as="style"
			href="<?php echo $google_fonts_url; ?>" />

		<link rel="stylesheet"
		href="<?php echo $google_fonts_url; ?>" />	
	<?php 
	}
		add_action( 'wp_head', 'wpdd_google_fonts', 3 );

	/*
	* style theme
	*/
	function hl_portfolio_style()  { 
		wp_enqueue_style( 'main', get_stylesheet_directory_uri() . hl_portfolio_get_hash( 'main.css' ) );
	}
	add_action( 'wp_enqueue_scripts', 'hl_portfolio_style' );


	/*
	* scripts theme
	*/
	function hl_portfolio_scripts()  {
		wp_enqueue_script('vendors', get_template_directory_uri() . hl_portfolio_get_hash('vendors.js'), array(), '', true);
		wp_enqueue_script('app', get_template_directory_uri() . hl_portfolio_get_hash('app.js'), array(), '', true);
	}
	add_action( 'wp_footer', 'hl_portfolio_scripts' );


	/*
	* hash webpack 
	*/
	function hl_portfolio_get_hash( $file ) {

		$map = get_template_directory() . '/dist/manifest.json';
		static $hash = null;

		if ( null === $hash ) {
			$hash = file_exists( $map ) ? json_decode( file_get_contents( $map ), true ) : [];
		}

		if ( array_key_exists( $file, $hash ) ) {
			return '/dist/' . $hash[ $file ];
		}
		return $file;
	}


	/**
	 * clean wordpress
	 */
	require get_template_directory() . '/cleaner.php';