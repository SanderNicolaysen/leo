export default function (string, instance) {
  // Split the string at "|" into max 2 parts, where the first part is in no and the second part is in en
  const substrings = string.split('|', 2);

  if (substrings.length === 2) {
    // If the chosen lang is no, return the no-part
    if (instance.$i18n.locale === 'no') { return substrings[0]; }

    // Else return the en-part
    return substrings[1];
  }

  return substrings[0];
}
