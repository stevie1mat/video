import clipboardCopy from 'clipboard-copy'
import { trackException } from '../bugs'

export function createLinkForRoom(room) {
  return `https://brie.fi/ng/${room}`
}

export async function shareLink(url, {
  title = 'Briefing URL',
  text = 'Please open the link in your browser to join the video conference',
} = {}) {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      })
      return true
    } catch (err) {
      trackException(err)
    }
  }
  if (window.electron) {
    try {
      // https://electronjs.org/docs/api/clipboard
      await window.electron.clipboard.writeText(url)
      // alert('The URL has been copied to your clipboard.')
      return true
    } catch (err) {
      trackException(err)
    }
  }
  try {
    await clipboardCopy(url)
    // alert('The URL has been copied to your clipboard.')
    return true
  } catch (err) {
    trackException(err)
  }
  alert(`Cannot copy ${url}. Please do by hand.`)
}
