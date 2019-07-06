import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/http://data.nba.net/json/cms/noseason/game/20190613/0041800406/pbp_all.json'
});

export default instance;
