import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x04AF3CdBA820FB94E51B56Aec9b728DC37b8C3e4"
);

export default instance;
