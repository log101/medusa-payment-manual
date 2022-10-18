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
    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: "123456789",
      price: "1",
      paidPrice: "1.2",
      currency: Iyzipay.CURRENCY.TRY,
      basketId: "B67832",
      paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
      callbackUrl: "http://localhost:8000/checkout",
      enabledInstallments: [2, 3, 6, 9],
      buyer: {
        id: "BY789",
        name: "John",
        surname: "Doe",
        gsmNumber: "+905350000000",
        email: "email@email.com",
        identityNumber: "74300864791",
        lastLoginDate: "2015-10-05 12:43:35",
        registrationDate: "2013-04-21 15:12:09",
        registrationAddress:
          "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        ip: "85.34.78.112",
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34732",
      },
      shippingAddress: {
        contactName: "Jane Doe",
        city: "Istanbul",
        country: "Turkey",
        address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        zipCode: "34742",
      },
      billingAddress: {
        contactName: "Jane Doe",
        city: "Istanbul",
        country: "Turkey",
        address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        zipCode: "34742",
      },
      basketItems: [
        {
          id: "BI101",
          name: "Binocular",
          category1: "Collectibles",
          category2: "Accessories",
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: "0.3",
        },
        {
          id: "BI102",
          name: "Game code",
          category1: "Game",
          category2: "Online Game Items",
          itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
          price: "0.5",
        },
        {
          id: "BI103",
          name: "Usb",
          category1: "Electronics",
          category2: "Usb / Cable",
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: "0.2",
        },
      ],
    }

    const getFormPromise = () =>
      new Promise((resolve, reject) => {
        this.iyzipay.checkoutFormInitialize.create(request, (err, result) => {
          resolve(result.checkoutFormContent)
        })
      })

    const form = await getFormPromise()

    return {
      cart: {
        ...cart,
        metadata: {
          htmlForm: form,
        },
      },
      status: "pending",
    }
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
      return {
        status: "authorized",
        data: { status: "authorized" },
      }
    }
  }

  /**
   * Noop, simply returns existing data.
   * @param {object} sessionData - payment session data.
   * @return {object} same data
   */
  async updatePayment(sessionData) {
    /* if (sessionData.data.action === "get-payment-form") {
      return {
        ...sessionData,
        paymentForm: "<html></html>",
      }
    } else {
      return sessionData.data
    }*/
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
