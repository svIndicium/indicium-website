import content from './content.json'

export function getPageData(slug) {
    return content.pages.find(page => page.slug === slug)
}

export function getBlockContentByTitle(title, contentBlocks) {
    return contentBlocks.find(block => block.title === title)
}