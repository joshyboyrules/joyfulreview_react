import React from 'react'

const content = <div>
  <div className="row">
    <div className="col-md-12">
      <img src="https://joyfulreview.files.wordpress.com/2017/11/img_0406.jpg" alt="zojirushi-mug-1" className="rounded"
           width="100%"/>
    </div>
  </div>
  <p>
    BRRRRR!! (shaking) It's that time of the year where I'm wishing for some warmer weather. Thankfully I have my <a href="https://amzn.to/2A3scwh" target="_blank" rel="noopener noreferrer">16oz Zojirushi Stainless Steel Mug</a> to transfer some warm liquids(mainly water) into my body. There are some <a href="https://www.livestrong.com/article/215380-drinking-hot-water-lemon-in-the-morning/" target="_blank" rel="noopener noreferrer">pseudo-benefits</a> to drinking warm water as well but personally I drink warm water cause it warms up my body (I know right).
  </p>

  <span className="post-section-header">Keeps Water Warm</span>
  <div>
    If there's something that the Zojirushi mug does well, it is keeping water warm. The mug keeps the water so warm that some people at times will complain about how <em>too</em> warm the water stays (which is a dumb reason to complain tbh). I suspect that it accomplishes this through the stellar design of the lid. I can fill up hot liquids at 8am and it will literally stay hot until 8pm. And when you pair this mug with a <a href="https://amzn.to/2zLP2rC" target="_blank" rel="noopener noreferrer">water boiler</a>, it becomes a winning combo against cold weather.
  </div>

  <span className="post-section-header">Design Design Design</span>
  <div>
    As the name suggests, the entire body of the mug is stainless steel, however the lid is made of plastic/rubber material. You can unscrew the lid entirely off the bottle, and the lid itself can be taken apart into four simple parts which make it <em>super super</em> easy to clean (as opposed to those <a href="https://amzn.to/2ATZeMH" target="_blank" rel="noopener noreferrer">strawed Contigo water bottles</a> that are difficult to wash). The lid also has a locking mechanism so that it will <em>never</em> spill in your bag.
  </div>
  <p>
    Fun Facts: The product dimensions are 2.8 (~7cm) x 2.8 x 8.6 (~22 cm) inches and it weighs 8 ounces (~227 grams). These dimensions/weight are ideal for fitting in any type of cupholder or any backpack-pockets for mugs.
  </p>
  <p>
    So I should mention that I do agree with the guys from 'Tested' (see Youtube section) that the sip hole is kind of small so it can get annoying to drink out of. So more often than not I find myself unscrewing the entire cap to let the liquids cool and drinking with the cap screwed off. It's minor but I thought it's worth mentioning.
  </p>

  <div className="row">
    <div className="col-md-12">
      <img src="https://joyfulreview.files.wordpress.com/2017/11/img_0411.jpg" alt="zojirushi-mug-2"
           className="rounded post-picture"
           width="100%"/>
    </div>
    <div className="col-md-12">
      <img src="https://joyfulreview.files.wordpress.com/2017/11/img_0420.jpg" alt="zojirushi-mug-2"
           className="rounded post-picture"
           width="100%"/>
    </div>
  </div>
  <p>
    The mug looks sharp. It definitely has a premium look and feel to it; and I guess it should since it retails for <a href="http://amzn.to/2A3scwh" target="_blank" rel="noopener noreferrer">around $27</a>. I've had my Zojirushi for over a year now and I can see minimal scratches/indents/blemishes; it's holding up quite well.
  </p>

  <p>
    <strong>Tip #1 - snap back lid</strong><br/>
    The lid itself can snap backwards by pushing the lid all the way back which holds the lid in the open position until you snap the lid back forward. I didn't realize this until I accidentally happened; it was a nice surprise, and it's super helpful since the lid won't accidentally hit you in the face when you are pouring hot scorching liquids down your throat
  </p>

  <p><strong>Tip #2 - protect your investment</strong></p>
  <div className="row">
    <div className="col-md-12">
      <img src="https://joyfulreview.files.wordpress.com/2017/11/img_04181.jpg" alt="zojirushi-mug-2" className="rounded post-picture"
           width="100%"/>
    </div>
  </div>
  <p>
    Be sure to tag/write your name on the mug somewhere just in case you lose it. I put my name and my phone # on it using a piece of paper and some scotch tape. Took 10 minutes, which could save you from buying another one. Also side benefit of letting other people know your phone #, if that's what you're into :P.
  </p>
</div>

const article = {
  id: 3,
  title: 'My Warm Companion: Zojirushi Stainless Mug',
  excerpt: 'The mug that I use everyday during cold weather; guaranteed to keep liquids hot... sometimes too hot',
  published: new Date(2017, 10, 15),
  updated: new Date(2017, 10, 15),
  content: content,
  author_id: 1,
  other: [
    {
      link: 'https://thewirecutter.com/reviews/best-travel-mug/',
      title: 'thewirecutter'
    }
  ],
  image: 'https://joyfulreview.files.wordpress.com/2017/11/img_0406.jpg',
  categories: [ 'gear' ],
  youtube: [
    {
      youtube_video_id: 'fwkGKWD9U5s',
      title: 'Show and Tell: New Zojirushi Mug!'
    }
  ],
  buy: [
    {
      'link': 'https://amzn.to/2hxlUd3',
      'title': 'Amazon ($25)'
    }
  ]
}

export default article
