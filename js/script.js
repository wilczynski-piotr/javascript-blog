'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE} remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const hrefAttribute = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const selectedArticle = document.querySelector(hrefAttribute);

  /* [DONE] add class 'active' to the correct article */
  selectedArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){

  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /*[DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){
    /*[DONE] get the article id */
    const articleId = article.getAttribute('id');

    /*[DONE] find the title element */
    /*[DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /*[DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /*[DONE] insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const articleTagsWraper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleDataTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleSplitedTags = articleDataTags.split(' ');
    /* START LOOP: for each tag */
      for(let articleSingleTag of articleSplitedTags){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + articleSingleTag + '">' + articleSingleTag + '</a>&nbsp;</li>';
      /* add generated code to html variable */
      html = html + linkHTML;
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    articleTagsWraper.innerHTML = html;
  }
  /* END LOOP: for every article: */
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksEqual = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLinkEqual of tagLinksEqual){
    /* add class active */
    tagLinkEqual.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let allLinksToTag of allLinksToTags){
    /* add tagClickHandler as event listener for that link */
    allLinksToTag.addEventListener("click", tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every authors: */
  for(let article of articles){
    /* find author wrapper */
    const authorsWraper = article.querySelector(optArticleAuthorSelector);
    /* get author name from data-author attribute */
    const authorName = article.getAttribute('data-author');
    /* generate HTML link code with right autor*/
    const authorLink = 'by&nbsp;<a href="#author-' + authorName + '">' + authorName + '</a>';
    /* insert HTML of all authors in the author wrapper */
    authorsWraper.innerHTML = authorLink;
    /* END LOOP: for every article: */
  }
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#author-', '');
  /* find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for (let activeAuthorLink of activeAuthorLinks) {
    /* remove class active */
    activeAuthorLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinksEqual = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let authorLinkEqual of authorLinksEqual){
    /* add class active */
    authorLinkEqual.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let allLinksToAuthor of allLinksToAuthors){
    /* add tagClickHandler as event listener for that link */
    allLinksToAuthor.addEventListener("click", authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
