import { Category, Product } from '@ngrx-nx-workshop/api-interfaces';

export const data: Product[] = [
  {
    id: '1',
    category: Category.BOOKS,
    price: 10.0,
    title: 'Math book',
    url: '/assets/books/accounting-administration-books-267582.jpg',
    description:
      // tslint:disable-next-line:max-line-length
      'Kale chips next level eiusmod readymade cupidatat la croix. Cloud bread cardigan enim, keffiyeh bitters post-ironic nisi occupy 3 wolf moon velit chambray twee migas. Qui hashtag heirloom tousled direct trade flexitarian dreamcatcher dolore lumbersexual authentic magna health goth. Ugh cliche blog, messenger bag plaid do dolor shabby chic irure nostrud. Laboris cold-pressed consequat, lyft aliqua quinoa mumblecore tumeric esse dolor pariatur enim swag blue bottle. Irony kale chips venmo deserunt dolore jianbing organic echo park consequat officia in tbh tilde selfies messenger bag. Organic ullamco skateboard dreamcatcher cornhole snackwave fashion axe irony poke single-origin coffee elit.',
    rating: 5
  },
  {
    id: '2',
    category: Category.BOOKS,
    price: 20.0,
    title: 'Sheet music',
    url: '/assets/books/black-and-white-blur-book-164821.jpg',
    description:
      // tslint:disable-next-line:max-line-length
      'Authentic austin pinterest microdosing vexillologist jean shorts iceland. Offal iceland forage poutine polaroid tofu pop-up gochujang retro elit. La croix cliche sed aesthetic, tumeric hammock ugh health goth jianbing vape vaporware. Tote bag heirloom kombucha, dolore succulents fixie readymade lorem master cleanse ethical schlitz meh blue bottle prism. Tumblr pabst offal ut asymmetrical.',
    rating: 3
  },
  {
    id: '3',
    category: Category.BOOKS,
    price: 5.0,
    title: 'Cookbook',
    url: '/assets/books/avocado-cherry-tomatoes-chopping-board-1166419.jpg',
    description:
      // tslint:disable-next-line:max-line-length
      `Next level prism trust fund XOXO est fashion axe austin. Listicle heirloom vinyl intelligentsia tofu, freegan portland in cornhole in mustache chia. Tempor pour-over pop-up quis. Mollit listicle mlkshk, shoreditch deserunt fugiat eu. Twee edison bulb food truck normcore irure narwhal cliche coloring book quinoa bicycle rights hella la croix gluten-free man braid. Marfa subway tile incididunt qui. Chartreuse retro occaecat marfa asymmetrical in. Anim do nisi, mumblecore master cleanse sartorial hammock cillum knausgaard air plant ad flannel. Echo park bespoke lo-fi, marfa do everyday carry kickstarter ugh flexitarian cillum. Small batch yuccie jianbing, flexitarian veniam hella hexagon pork belly coloring book actually gastropub irony. Church-key waistcoat dolore, PBR&B copper mug hella minim voluptate tumblr blog jean shorts disrupt semiotics aute. Vape quis mustache wolf iPhone. Shabby chic chillwave lo-fi, sint fingerstache kinfolk incididunt literally flexitarian fugiat. Normcore velit microdosing, banjo portland yr affogato narwhal venmo. Drinking vinegar celiac quis single-origin coffee. Tempor fashion axe veniam magna chambray shaman poke raw denim organic. Activated charcoal meditation labore fixie chia four loko hoodie authentic unicorn. Deep v poutine tousled, keytar air plant skateboard hoodie. Cray farm-to-table swag, +1 fam id readymade bicycle rights DIY aesthetic poke chicharrones lyft.`,
    rating: 4
  },
  {
    id: '4',
    category: Category.ELECTRONICS,
    price: 125.0,
    title: 'Speakers',
    url: '/assets/electronics/amplifier-audio-bass-302879.jpg',
    description:
      // tslint:disable-next-line:max-line-length
      `In nostrud fam, polaroid dreamcatcher heirloom enim fugiat tumeric selfies ea aliquip offal. Freegan quinoa butcher mumblecore DIY. Gochujang PBR&B normcore sartorial, try-hard poutine do fashion axe you probably haven't heard of them. Whatever roof party la croix cronut enim listicle trust fund fashion axe intelligentsia dolor unicorn. Locavore salvia helvetica craft beer occupy biodiesel butcher snackwave, direct trade bushwick pinterest lorem.`,
    rating: 2
  },
  {
    id: '5',
    category: Category.ELECTRONICS,
    price: 1125.0,
    title: 'Quadcopter',
    url: '/assets/electronics/adult-blur-bright-529599.jpg',
    description:
      // tslint:disable-next-line:max-line-length
      'Quis blue bottle shaman aute hashtag qui microdosing sriracha tote bag messenger bag laboris bitters keffiyeh chillwave. Waistcoat activated charcoal qui, air plant in ugh salvia exercitation cred tumblr. Four loko prism ad yr nisi subway tile tempor. Kombucha dreamcatcher heirloom yuccie aute pork belly vinyl id.',
    rating: 5
  },
  {
    id: '6',
    category: Category.ELECTRONICS,
    price: 125.0,
    title: 'Camera',
    url: '/assets/electronics/action-adult-aperture-320617.jpg',
    description:
      // tslint:disable-next-line:max-line-length
      `Disrupt tote bag echo park asymmetrical leggings. Cold-pressed vexillologist portland, DIY cillum cred yr. Sriracha excepteur taiyaki, shoreditch hot chicken celiac keffiyeh listicle. Pinterest knausgaard duis laboris sartorial. Sriracha gochujang aute, trust fund before they sold out portland mollit woke semiotics sunt kinfolk kombucha. La croix bicycle rights lo-fi, slow-carb tilde street art in sint air plant vice nulla lumbersexual. Trust fund gochujang marfa officia forage slow-carb gastropub yr helvetica synth jean shorts microdosing.`,

    rating: 4
  },
  {
    id: '7',
    category: Category.FURNITURE,
    price: 225.0,
    title: 'Chair',
    url: '/assets/furniture/pexels-photo-963486.jpg',
    description:
      // tslint:disable-next-line:max-line-length
      `Taxidermy woke four loko sustainable try-hard, freegan cliche vaporware chillwave. Quinoa chambray subway tile, asymmetrical slow-carb photo booth gochujang. Tote bag street art next level disrupt viral, leggings shaman. Kinfolk activated charcoal hella biodiesel. Umami bicycle rights lomo coloring book 90's vexillologist sartorial, disrupt iPhone vice portland brunch bushwick ethical next level. Fanny pack humblebrag pinterest cray austin tote bag keytar celiac bushwick flannel pug enamel pin iPhone vegan.`,
    rating: 3
  },
  {
    id: '8',
    category: Category.FURNITURE,
    price: 1125.0,
    title: 'Bed',
    url: '/assets/furniture/pexels-photo-775219.jpg',
    description:
      // tslint:disable-next-line:max-line-length
      `Wayfarers gochujang knausgaard, man bun drinking vinegar church-key ethical retro poke umami subway tile glossier distillery. Organic chillwave hashtag hot chicken, you probably haven't heard of them subway tile flexitarian leggings knausgaard post-ironic dreamcatcher paleo pop-up church-key keffiyeh. Aesthetic adaptogen food truck copper mug kickstarter helvetica green juice, yuccie blue bottle snackwave before they sold out kinfolk cronut. XOXO kombucha cloud bread, plaid chia godard pok pok pabst actually lomo pour-over austin schlitz. Kombucha williamsburg squid kogi slow-carb keytar pinterest.`,
    rating: 5
  },
  {
    id: '9',
    category: Category.FURNITURE,
    price: 225.0,
    title: 'Couch',
    url: '/assets/furniture/pexels-photo-276583.jpg',
    description:
      // tslint:disable-next-line:max-line-length
      `Humblebrag fashion axe hexagon franzen tousled. Four loko pok pok coloring book flexitarian, butcher retro taxidermy af direct trade. Lumbersexual enamel pin la croix, tofu poutine coloring book 3 wolf moon literally pour-over hexagon brooklyn wolf. Tumeric chia hashtag marfa ugh YOLO blog tilde. Paleo activated charcoal franzen +1 ugh fam.`,
    rating: 4
  }
];
