import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation GenerateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_EMPTY_GUEST_CART = gql`
  mutation {
    createEmptyCart(input: {})
  }
`;
export const ASSIGN_CUSTOMER_TO_GUEST_CART = gql`
  mutation AssignCustomerToGuestCart($cartId: String!) {
    assignCustomerToGuestCart(cart_id: $cartId) {
      email
      id
      is_virtual
      total_quantity
      items {
        uid
        quantity
        prices {
          discounts {
            amount {
              currency
              value
            }
            label
          }
          row_total {
            currency
            value
          }
        }
        product {
          name
          sku
          thumbnail {
            url
            label
          }
          price_range {
            maximum_price {
              final_price {
                currency
                value
              }
            }
          }
          url_key
          url_suffix
        }
      }
      prices {
        discounts {
          amount {
            currency
            value
          }
          label
        }
        applied_taxes {
          amount {
            currency
            value
          }
          label
        }
        subtotal_excluding_tax {
          currency
          value
        }
        subtotal_including_tax {
          currency
          value
        }
        subtotal_with_discount_excluding_tax {
          currency
          value
        }
      }
    }
  }
`;
// export const ADD_SIMPLE_PRODUCT_TO_CART = gql`
//   mutation AddSimpleProductsToCart(
//     $cartId: String!
//     $quantity: Float!
//     $sku: String!
//   ) {
//     addSimpleProductsToCart(
//       input: {
//         cart_id: $cartId
//         cart_items: [{ data: { quantity: $quantity, sku: $sku } }]
//       }
//     ) {
//       cart {
//         applied_coupons {
//           code
//         }
//         available_payment_methods {
//           code
//           is_deferred
//           title
//         }
//         billing_address {
//           uid
//           firstname
//           lastname
//           street
//           city
//           region {
//             code
//             region_id
//             label
//           }
//           country {
//             code
//             label
//           }
//           postcode
//           vat_id
//           custom_attributes {
//             attribute_code
//             value
//           }
//         }
//         email
//         gift_message {
//           from
//           message
//           to
//         }
//         id
//         is_virtual
//         items {
//           quantity
//           uid
//           prices {
//             discounts {
//               amount {
//                 currency
//                 value
//               }
//               label
//             }
//             price {
//               currency
//               value
//             }
//             row_total {
//               currency
//               value
//             }
//             total_item_discount {
//               currency
//               value
//             }
//           }
//           product {
//             name
//             sku
//             price_range {
//               maximum_price {
//                 final_price {
//                   currency
//                   value
//                 }
//               }
//             }
//           }
//         }
//         # order_gift_message
//         prices {
//           discounts {
//             amount {
//               currency
//               value
//             }
//             label
//           }
//           applied_taxes {
//             amount {
//               currency
//               value
//             }
//             label
//           }
//         }
//         selected_payment_method {
//           code
//           purchase_order_number
//           title
//         }
//         # shipping_addresses
//         total_quantity
//       }
//     }
//   }
// `;
export const MERGE_CARTS = gql`
  mutation mergeCarts($sourceCartId: String!, $destinationCartId: String!) {
    mergeCarts(
      source_cart_id: $sourceCartId
      destination_cart_id: $destinationCartId
    ) {
      amasty_delivery_date {
        comment
        date
      }
      amasty_gift_wrap {
        amount
        base_amount
        currency_code
      }

      applied_coupons {
        code
      }
      available_payment_methods {
        code
        is_deferred
        title
      }
      billing_address {
        city
        company
        country {
          code
          label
        }
        custom_attributes {
          value
          attribute_code
        }
        firstname
        lastname
        postcode
        region {
          code
          label
        }
        street
        telephone
        uid
        vat_id
      }
      email
      gift_message {
        from
        message
        to
      }
      id
      is_virtual
      items {
        id
        prices {
          discounts {
            amount {
              currency
              value
            }
            label
          }
          row_total {
            currency
            value
          }
        }
        product {
          name
          sku
          thumbnail {
            label
            url
          }
          price_range {
            maximum_price {
              final_price {
                currency
                value
              }
            }
          }
        }
        quantity
        uid
      }
      order_gift_message {
        message
        recipient
        sender
      }
      prices {
        applied_taxes {
          amount {
            currency
            value
          }
          label
        }
        discounts {
          amount {
            currency
            value
          }
          label
        }
        grand_total {
          currency
          value
        }
        subtotal_excluding_tax {
          currency
          value
        }
        subtotal_including_tax {
          currency
          value
        }
        subtotal_with_discount_excluding_tax {
          currency
          value
        }
      }
      selected_payment_method {
        code
        purchase_order_number
        title
      }
      shipping_addresses {
        available_shipping_methods {
          carrier_code
          carrier_title
          method_code
          method_title
          price_excl_tax {
            currency
            value
          }
          price_incl_tax {
            currency
            value
          }
        }

        cart_items_v2 {
          prices {
            discounts {
              amount {
                currency
                value
              }
              label
            }
          }
          quantity
          product {
            name
            url_key
            url_suffix
            sku
            thumbnail {
              url
              label
            }
          }
        }
        city
        company
        country {
          code
          label
        }
        custom_attributes {
          value
          attribute_code
        }
        firstname
        lastname
        postcode
        region {
          code
          label
        }
        street
        telephone
        uid
        vat_id
      }
      total_quantity
    }
  }
`;
export const REMOVE_CART_ITEM = gql`
  mutation removeItemFromCart($cartId: String!, $cartItemUid: ID) {
    removeItemFromCart(
      input: { cart_id: $cartId, cart_item_uid: $cartItemUid }
    ) {
      cart {
        amasty_delivery_date {
          comment
          date
        }
        amasty_gift_wrap {
          amount
          base_amount
          currency_code
        }
        applied_coupons {
          code
        }
        available_payment_methods {
          code
          is_deferred
          title
        }
        billing_address {
          city
          company
          country {
            code
            label
          }
          custom_attributes {
            value
            attribute_code
          }
          firstname
          lastname
          postcode
          region {
            code
            label
          }
          street
          telephone
          uid
          vat_id
        }
        email
        gift_message {
          from
          message
          to
        }
        id
        is_virtual
        items {
          id
          prices {
            discounts {
              amount {
                currency
                value
              }
              label
            }
            price {
              currency
              value
            }
            row_total {
              currency
              value
            }
          }
          product {
            name
            sku
            thumbnail {
              url
              label
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
              }
            }
            url_key
            url_suffix
          }
          quantity
          uid
        }
        order_gift_message {
          message
          recipient
          sender
        }
        prices {
          applied_taxes {
            amount {
              currency
              value
            }
            label
          }
          discounts {
            amount {
              currency
              value
            }
            label
          }
          grand_total {
            currency
            value
          }
          subtotal_excluding_tax {
            currency
            value
          }
          subtotal_including_tax {
            currency
            value
          }
          subtotal_with_discount_excluding_tax {
            currency
            value
          }
        }
        selected_payment_method {
          code
          purchase_order_number
          title
        }
        shipping_addresses {
          available_shipping_methods {
            carrier_code
            carrier_title
            method_code
            method_title
            price_excl_tax {
              currency
              value
            }
            price_incl_tax {
              currency
              value
            }
          }
          cart_items_v2 {
            prices {
              discounts {
                amount {
                  currency
                  value
                }
                label
              }
            }
            quantity
            product {
              name
              url_key
              url_suffix
              sku
              thumbnail {
                url
                label
              }
            }
          }
          city
          company
          country {
            code
            label
          }
          custom_attributes {
            value
            attribute_code
          }
          firstname
          lastname
          postcode
          region {
            code
            label
          }
          street
          telephone
          uid
          vat_id
        }
        total_quantity
      }
    }
  }
`;

export const SET_GUEST_EMAIL_ON_CART = gql`
  mutation SetGuestEmailOnCart($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        email
        id
        is_virtual
        total_quantity
        amasty_delivery_date {
          comment
          date
        }
        amasty_gift_wrap {
          amount
          base_amount
          currency_code
        }
        applied_coupons {
          code
        }
        available_payment_methods {
          code
          is_deferred
          title
        }
        billing_address {
          city
          company
          firstname
          lastname
          postcode
          street
          telephone
          uid
          vat_id
          country {
            code
            label
          }
          custom_attributes {
            attribute_code
            value
          }
          region {
            code
            label
            region_id
          }
        }
        items {
          uid
          product {
            name
            sku
            uid
            thumbnail {
              label
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
              }
            }
          }
          prices {
            discounts {
              label
              amount {
                currency
                value
              }
            }
            price {
              currency
              value
            }
            row_total {
              currency
              value
            }
          }
          quantity
        }
        gift_message {
          from
          message
          to
        }
        order_gift_message {
          message
          recipient
          sender
        }
        prices {
          applied_taxes {
            label
            amount {
              currency
              value
            }
          }
          discounts {
            label
            amount {
              currency
              value
            }
          }
          grand_total {
            currency
            value
          }
          subtotal_excluding_tax {
            currency
            value
          }
          subtotal_including_tax {
            currency
            value
          }
          subtotal_with_discount_excluding_tax {
            currency
            value
          }
        }
        selected_payment_method {
          code
          purchase_order_number
          title
        }
        shipping_addresses {
          available_shipping_methods {
            carrier_code
            carrier_title
            method_code
            method_title
            price_excl_tax {
              currency
              value
            }
            price_incl_tax {
              currency
              value
            }
          }
          cart_items_v2 {
            prices {
              discounts {
                label
                amount {
                  currency
                  value
                }
              }
            }
            quantity
            product {
              name
              sku
              uid
              url_key
              url_suffix
              thumbnail {
                label
                url
              }
            }
          }
          city
          company
          country {
            code
            label
          }
          custom_attributes {
            attribute_code
            value
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          telephone
          street
          uid
          vat_id
        }
      }
    }
  }
`;
