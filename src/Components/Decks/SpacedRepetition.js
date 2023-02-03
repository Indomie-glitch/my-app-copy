import { useState, useEffect } from "react";

const SpacedRepetition = () => {
    const [cards,setCards] = useState([]);
    const [intervals, setIntervals] = useState([1, 2, 7, 30]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        //Filter the cards to only those whose next review date is in the past
        const dueCards = cards
        .filter(card => new Date() >= new Date(card.nextReview))
        //Sort the cards by the date of their next review, so that the card with the earlist date will be displayed first
        .sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));

        //Loop through each due card
dueCards.forEach(card => {
    const answer = prompt(card.question);
    //Prompt the user with the question from the card
    let interval = intervals[index];
    let newIndex = index;
    //Check if the user's answer is correct
    if(answer.trim().toLowerCase() === card.answer.toLowerCase()){
        //If correct, set the interval to the next one in the intervals array or double the current interval
        interval = intervals[index + 1] || interval * 2;
        //Update the index to the next one in the rinetervals array or set it back to 0 if it's already at the end of the array
        newIndex = (index + 1) % intervals.length;
    }else{
        //If incorrect, set the interval to the first one in the interval array
        interval = intervals[0]
        //Reset the index to 0
        newIndex = 0;
    }
    //Update the index
    setIndex(newIndex);
    //Update the cards state with the new next review date for the current card
    setCards(
        cards.map(c => {
            if (c.question === card.question) { 
                return {
                    ...c,
                     nextReview: new Date(new Date().getTime() + intervals * 24 * 60 * 60 * 1000)
                    };
                }else {
                    return c;
            }
        })
     );
});


},[cards, intervals]);
};

export default SpacedRepetition
