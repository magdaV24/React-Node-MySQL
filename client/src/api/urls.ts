import { localhost } from "./localhost";
const user = `${localhost}/user`; 
const art_work = `${localhost}/art_work`; 

export const REGISTER = `${user}/register`;
export const LOGIN = `${user}/login`;

export const SUBMIT_ART_WORK = `${art_work}/submit`;
export const DETERMINE_ID = `${art_work}/determine_id`;