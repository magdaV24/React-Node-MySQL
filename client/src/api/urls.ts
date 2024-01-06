import { localhost } from "./localhost";

const user = `${localhost}/user`;
const entry = `${localhost}/entry`;
const photo = `${localhost}/photo`;

// User Management

export const REGISTER = `${user}/register`;
export const LOGIN = `${user}/login`;
export const FETCH_USERNAME = `${user}/fetch_username`;
export const FETCH_USER = `${user}/fetch`;

// Art works Management

export const SUBMIT_ART_WORK = `${entry}/submit`;
export const FETCH_IF_PUBLIC = `${entry}/public`;
export const FETCH_ENTRY = `${entry}/fetch_entry`;
export const EDIT_FIELDS = `${entry}/edit_fields`;
export const FETCH_USER_PUBLIC_ENTRIES = `${entry}/public`;
export const FETCH_USER_ENTRIES = `${entry}/entries`;
export const DELETE_ENTRY = `${entry}/delete`;

export const ADD_PHOTO = `${photo}/upload_photo`;
export const FETCH_ENTRY_PHOTOS = `${photo}/fetch_entry_photos`
export const FETCH_ENTRY_THUMBNAIL = `${photo}/fetch_entry_thumbnail`
export const DELETE_PHOTO = `${photo}/delete_photo`;
