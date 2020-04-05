import { createSelector } from "reselect";
import { RootState } from "../types";
import { Status, Card } from "./types";
import moment from "moment";

export const cardsMapSelector = (state: RootState) => state.cards.patients;

/**
 * Compare card to find the most recent.
 * @param {Card} a first card
 * @param {Card} b second card
 */
function compareDate(a: Card, b: Card): number {
  const createdDateA = a.created_date || 0;
  const createdDateB = b.created_date || 0;
  let comparison = 0;
  if (moment(createdDateA).isAfter(createdDateB)) {
    comparison = -1;
  } else if (moment(createdDateA).isBefore(createdDateB)) {
    comparison = 1;
  }
  return comparison;
}

/**
 * Request to find if the card match with the search from patient_name AND arrhythmias (without casse)
 * @param {string} str Search request
 * @param {boolean} card Card to check
 * @param {boolean} booleab true weather the card match
 */
function searchCard(str: string | null, card: Card): boolean {
  return str
    ? card.patient_name.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
        card.arrhythmias.join().toLowerCase().indexOf(str.toLowerCase()) > -1
    : true;
}

/**
 * Get TODO cards from the cardsMap
 * @return {Card[]}
 */
export const todoCardsSelector = createSelector([cardsMapSelector], (cardsMap) => {
  return Object.values(cardsMap)
    .filter((card: Card) => card.status === Status.PENDING || card.status === Status.COMPLETED)
    .sort(compareDate);
});

/**
 * Get DONE cards from the cardsMap
 * @return {Card[]}
 */
export const doneCardsSelector = createSelector([cardsMapSelector], (cardsMap) => {
  return Object.values(cardsMap)
    .filter((card: Card) => card.status === Status.DONE)
    .sort(compareDate);
});

/**
 * Get TODO cards from the cardsMap AND search request
 * @param {RootState} state RootState
 * @param {string | null} search search request
 * @return  {Card[]}
 */
export const sortedTodoCardsSelector = (state: RootState, search: string | null) => {
  const cardsMap = todoCardsSelector(state);
  return cardsMap.filter((card: Card) => searchCard(search, card));
};

/**
 * Get DONE cards from the cardsMap AND search request
 * @param {RootState} state RootState
 * @param {string | null} search search request
 * @return  {Card[]}
 */
export const sortedDoneCardsSelector = (state: RootState, search: string | null) => {
  const cardsMap = doneCardsSelector(state);
  return cardsMap.filter((card: Card) => searchCard(search, card));
};
