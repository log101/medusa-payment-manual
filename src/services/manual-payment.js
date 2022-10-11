import { PaymentService } from "medusa-interfaces"
import { PaymentSessionStatus } from "@medusajs/medusa/dist"
const Iyzipay = require("iyzipay")

class ManualPaymentService extends PaymentService {
  static identifier = "manual"

  constructor() {
    super()
    this.iyzipay = new Iyzipay()
  }

  /**
   * Returns the currently held status.
   * @param {object} paymentData - payment method data from cart
   * @return {string} the status of the payment
   */
  async getStatus(paymentData) {
    const { status } = paymentData
    return status
  }

  /**
   * Creates a manual payment with status "pending"
   * @param {object} cart - cart to create a payment for
   * @return {object} an object with staus
   */
  async createPayment(cart) {
    return { cart: cart, status: "pending" }
  }

  /**
   * Retrieves payment
   * @param {object} data - the data of the payment to retrieve
   * @return {Promise<object>} returns data
   */
  async retrievePayment(data) {
    return data
  }

  /**
   * Updates the payment status to authorized
   * and charge the user
   * @param {object} session - payment session data
   * @param {object} context - properties relevant to current context
   * @return {Promise<{ status: string, data: object }>} result with data and status
   */
  async authorizePayment(session, context) {
    return { status: "authorized", data: { status: "authorized" } }
  }

  /**
   * Noop, simply returns existing data.
   * @param {object} sessionData - payment session data.
   * @return {object} same data
   */
  async updatePayment(sessionData) {
    return sessionData.data
  }

  /**
   .
   * @param {object} sessionData - payment session data.
   * @param {object} update - payment session update data.
   * @return {object} existing data merged with update data
   */
  async updatePaymentData(sessionData, update) {
    return { ...sessionData.data, ...update.data }
  }

  async deletePayment() {
    return
  }

  /**
   * Updates the payment status to captured
   * It is not supported in Iyzico
   * @param {object} paymentData - payment method data from cart
   * @return {object} object with updated status
   */
  async capturePayment() {
    return { status: "captured" }
  }

  /**
   * Returns the data currently held in a status
   * @param {object} session - payment method data from cart session
   * @return {object} the current data
   */
  async getPaymentData(session) {
    return session.data
  }

  /**
   * Noop, resolves to allow manual refunds.
   * @param {object} payment - payment method data from cart
   * @return {string} same data
   */
  async refundPayment(payment) {
    return payment.data
  }

  /**
   * Updates the payment status to cancled
   * @return {object} object with canceled status
   */
  async cancelPayment() {
    return { status: "canceled" }
  }
}

export default ManualPaymentService
