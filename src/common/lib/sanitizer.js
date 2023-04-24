import sanitizeHtml from 'sanitize-html';

const defaultOptions = {
  ...sanitizeHtml.defaults,
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    'h1',
    'h2',
    'ins',
    'sub',
    'sup',
    'span',
    'del',
    'img',
    'iframe',
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    '*': ['style'],
    a: [...sanitizeHtml.defaults.allowedAttributes.a, 'data-*', 'class'],
    iframe: ['src', 'frameborder', 'frameBorder', 'allowfullscreen', 'height', 'width'],
    span: ['class', 'contenteditable', 'data-*'],
    img: [...sanitizeHtml.defaults.allowedAttributes.img, 'width', 'height'],
  },
  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com', 'www.dailymotion.com'],
};

/**
 * A thin wrapper around `sanitizeHtml`, with updated defaults as config
 * @param {String} html
 * @param {Object} [options]
 */
const sanitize = (html, options = defaultOptions) => sanitizeHtml(html, options);

export default sanitize;
