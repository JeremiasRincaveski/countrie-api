import { paisExato } from "./service.js";

const url = window.location.href
const urlObj = new URL(url);
const pais = urlObj.searchParams.get(`pais`)

paisExato(pais);