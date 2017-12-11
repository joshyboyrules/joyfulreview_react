import React from 'react'

const content = <div>
  <div className="row">
    <div className="col-md-12">
      <img src="https://joyfulreview.files.wordpress.com/2017/12/equifax_data_breach.jpg" alt="equifax-1"
           className="rounded"
           width="100%"/>
    </div>
  </div>
  <p>
    If you live in America and you are over 18, then most likely you were affected in the latest Equifax data breach (<a
    href="http://www.cbc.ca/news/world/equifax-canadians-affected-update-1.4424066" target="_blank" rel="noopener noreferrer">some Canadians were
    affected too</a>). Equifax is one of the three major consumer credit reporting agencies in America (Experian and
    TransUnion are the other two) which gives them access to your private information; think of things like Social
    Security Number, birth date, list of past addresses. And that is why this data breach is unlike any other in the
    past, not just because of the number people affected but also the kind of information the hackers stole.
  </p>

  <p>
    When someone has your private information like your Social Security Number, date of birth, and home address then
    they can apply for credit under your name (e.g. apply for credit cards). The good news is that since there’s so many
    people affected (143+ million) there’s a lesser chance of someone stealing your identity. However, if you don’t like
    those odds and would rather pay a small fee ($20) to avoid the headaches of identity theft then this is what you
    should do.
  </p>

  <span className="post-section-header">Freezing your credit</span>
  <div>
    Every time someone applies for credit under your Social Security Number, the lender will need to fetch a credit
    report in order to continue the process. You can stop this from happening through freezing your credit, which
    disallows any lender to fetch for your credit report thus stopping someone from opening credit under your name. The
    process is really simple and straightforward just click on the links below and follow their instructions (takes >1
    hr).
  </div>

  <ul>
    <li><a href="https://www.freeze.equifax.com/Freeze/jsp/SFF_PersonalIDInfo.jsp" target="_blank" rel="noopener noreferrer">Equifax ($0)</a>
    </li>
    <li><a href="https://www.experian.com/ncaconline/freeze" target="_blank" rel="noopener noreferrer">Experian ($10)</a></li>
    <li><a href="https://freeze.transunion.com/sf/securityFreeze/landingPage.jsp" target="_blank" rel="noopener noreferrer"> TransUnion
      ($10)</a></li>
  </ul>
  <p>
    (^^These sites look like phishing/scam sites but they are actually legit)
  </p>

  <p>
    If you would rather talk to a human being or you don’t trust the security of the companies’ sites (lol) then you can
    try calling the following numbers:
  </p>

  <ul>
    <li>Equifax - 1-800-685-1111</li>
    <li>Experian - 1-888-397-3742</li>
    <li>TransUnion - 1-888-909-8872</li>
  </ul>

  <span className="post-section-header">Caveat</span>
  <div>
    You are able to temporarily unfreeze your account with a PIN that is provided at the time of freezing; and since you
    can, if someone really wanted to royally screw you they could obtain that PIN number through pretending to be you
    (e.g. providing your SSN, date of birth, etc). So the thought is then if a hacker/thief wanted to just make a quick
    buck; they probably wouldn’t go through the hassle of obtaining a PIN to temporarily unfreeze someone’s credit, they
    would rather target the unsuspecting victim who hasn’t frozen their credit yet.
  </div>

  <span className="post-section-header">Downsides</span>
  <div>
    Obviously, the inherent downside to freezing your credit is that it makes it more difficult for you to apply for
    credit. Going forward, when you apply for credit, you will need to temporarily unfreeze your credit with one of the
    three credit reporting agencies (Equifax, Experian, or Transunion); whichever one the lender is trying to use to
    fetch your credit report. This process can be cumbersome because most of the time you won’t know which reporting
    agency is being used, so you will most likely have to call each one.
  </div>
  <p>
    And since this process is so inconvenient, it makes it less likely for you to sign up for the <a
    href="https://www.nerdwallet.com/the-best-credit-cards?trk=nw_gn1_4.0" target="_blank" rel="noopener noreferrer">best credit cards </a>, which
    for me is a downside but maybe not for you.
  </p>
</div>

const article = {
  id: 5,
  title: 'Freezing your Credit',
  excerpt: '143 million Americans had their private information stolen; freeze your credit to protect yourself',
  published: new Date(2017, 11, 2),
  updated: new Date(2017, 11, 2),
  content: content,
  author_id: 1,
  other: [
    {
      link: 'www.nytimes.com/interactive/2017/your-money/equifax-data-breach-credit.html#first',
      title: 'nytimes'
    }
  ],
  image: 'https://joyfulreview.files.wordpress.com/2017/12/equifax_data_breach.jpg?w=840',
  categories: [ 'guide' ]
}

export default article
