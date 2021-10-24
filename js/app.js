// get the sections' collection and length in an object
let sections = {
    getSectionsCollection : function () { return [...document.getElementsByTagName("section")] ;},
    getSectionsLength : function () { return sections.getSectionsCollection().length ; } 
} ; 


// a function to sections dynamically given the number of sections to be added
function addSections (sectionsNumber)
{
    // create a fragment to append sections
    sectionsFragment = document.createDocumentFragment() ;
    // determine the first section number to appended 
    let sectionNumber = sections.getSectionsLength() + 1 ;
    for (let i=0 ; i<sectionsNumber ; i++)
    {
        // define the new section element
        let newSection =  document.createElement('section') ;
        // update the number of section
        sectionNumber += i ;
        // define the id and data-nav attributes for this new section
        newSection.setAttribute('id', `section${sectionNumber}` ) ;
        newSection.setAttribute('data-nav', `Section ${sectionNumber}`)  ;
        // get the inner HTML of the new section from any existing section and change the header 
        newSection.innerHTML = sections.getSectionsCollection()[2].innerHTML ;
        newSection.querySelector('h2').textContent = `Section ${sectionNumber}` ; 
        // append the section to the fragment
        sectionsFragment.appendChild(newSection) ;
    }
    // append the fragment to the main
    document.querySelector('main').appendChild(sectionsFragment) ;
}

// a function to build navigation bar for sections
function createNav() 
{
    // create a list fragment to append each list item to
    listFragment = document.createDocumentFragment() ; 
    for (let i =0 ; i<sections.getSectionsLength() ; i++)
    { 
        // define each section individually
        const section = sections.getSectionsCollection()[i] ;
        // create a list item for each section 
        const item = document.createElement('li') ;
        // create anchor element for each list item 
        const anchor = document.createElement('a') ;
        // the reference of each anchor is the Id of each section
        anchor.setAttribute('href', `#${section.getAttribute('id')}`) ;
        // will be used later to scroll smoothly
        anchor.setAttribute('data-nav', `${section.getAttribute('id')}`) ;
        // the text of each anchor is the data-nav of each section
        anchor.textContent = section.getAttribute('data-nav') ;
        // set the class of each anchor to add style
        anchor.setAttribute('class', 'menu__link') ;
        // append each anchor to each list item 
        item.appendChild(anchor) ;
        // append each item to the list fragment
        listFragment.appendChild(item) ;
    }
    // append the list fragment to unordered list
    document.querySelector('#navbar__list').appendChild(listFragment) ;
}

// a function to add a specific style to the section in viewport only
const options = {root : null, threshold: 0.6} ;
function activateViewPortSection()
{
    const observer = new IntersectionObserver( function(entries)
    {
        entries.forEach(entry =>
            { 
                if (entry.isIntersecting && !entry.target.classList.contains('your-active-class'))
                { 
                    // activate the section in view port
                    entry.target.classList.add('your-active-class') ;
                }
                else
                { 
                    // disactivate the section not in view port
                    entry.target.classList.remove('your-active-class') ;
                }
            });
    }, options) ;
    sections.getSectionsCollection().forEach(section => {observer.observe(section);}) ;
}


// add number of sections dynamically
addSections(2) ;

// build the nav
createNav() ;

// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', activateViewPortSection) ;

// to scroll smoothly
document.getElementById("navbar__list").addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.dataset.nav)
    {
      document.getElementById(`${event.target.dataset.nav}`).scrollIntoView({behavior: "smooth"}) ;
    }
});