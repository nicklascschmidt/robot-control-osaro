import axios from 'axios';

export const baseServerUrl = 'http://localhost:5000';

export const getRobotStateFromApi = () => {
  return axios.get(`${baseServerUrl}/state`);
}

export const postRobotActionToApi = (action) => {
  return axios.post(`${baseServerUrl}/action`, { action });
}

/**
 * @summary - decodes html into regular text
 *          - Source: https://stackoverflow.com/a/34064434/9750688
 * @example - `&quot;` --> `"`
 */
function htmlDecode(input) {
  console.log('input', input);
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

/**
 * @summary - grabs Flask.abort() message from error data HTML string
 *          - ** this is not ideal - message should be easier to access from
 *            .catch() error, but it currently isn't **
 * @param {string} htmlError - error body returned from Flask.abort()
 * @returns {string} - plain message from robot.py server
 */
export const getErrorMessageFromErrorHtmlData = (htmlError) => {
  try {
    const message = htmlError.substring(htmlError.indexOf('<p>')+3, htmlError.indexOf('</p>'));
    return htmlDecode(message)
  } catch (error) {
    return 'Encountered an Error.';
  }
}
