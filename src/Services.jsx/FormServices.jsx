import React, { Component } from "react";
import axios from "axios";
const GET = "http://localhost:7737/taxreturns/getpendingformList";
const GETAllForms = "http://localhost:7737/taxreturns/getAllformList";
const GETApproved = "http://localhost:7737/taxreturns/getApprovedformList";
const GETRejected = "http://localhost:7737/taxreturns/getRejectedformList";
const GETPayment = "http://localhost:7737/taxreturns/getPaymentformList";

const SAVE = "http://localhost:7737/taxreturns/forminsert";
const FetchId = "http://localhost:7737/taxreturns/GetformId/";
const GetIdList = "http://localhost:7737/taxreturns/getFormbyUserId";




class FormServices extends Component {
  getPendingforms() {
    return axios.get(GET);
  }
  getAllformList() {
    return axios.get(GETAllForms);
  }

  getApprovedformList() {
    return axios.get(GETApproved);
  }
  getRejectedformList() {
    return axios.get(GETRejected);
  }
  getPaymentformList() {
    return axios.get(GETPayment);
  }

  forminsert(form) {
    return axios.post(SAVE, form);
  }
  getFormbyUserId(formId) {
    return axios.get(FetchId + formId);
  }


  GetformId() {
    return axios.get(GetIdList);
  }
}
export default new FormServices()