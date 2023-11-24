export default function capitalizeWords(sentence) {
    // Split the sentence into words
    let words = sentence.split(' ');

    // Capitalize the first letter of each word
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back together into a sentence
    let capitalizedSentence = words.join(' ');

    return capitalizedSentence;
}