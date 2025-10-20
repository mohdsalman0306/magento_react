import { gql } from "@apollo/client";
// export const GET_MEGAMENU = gql`query%20getMegaMenu(%24parentId%3AString!%2C%24pageSize%3AInt!%2C%24currentPage%3AInt!)%7Bcategories(filters%3A%7Bparent_id%3A%7Beq%3A%24parentId%7D%7DpageSize%3A%24pageSize%20currentPage%3A%24currentPage)%7Bitems%7Buid%20name%20level%20url_path%20url_suffix%20children_count%20include_in_menu%20children%7Buid%20name%20level%20url_path%20url_suffix%20children_count%20include_in_menu%20children%7Buid%20name%20level%20url_path%20url_suffix%20children_count%20include_in_menu%7D%7D%7Dpage_info%7Bcurrent_page%20page_size%20total_pages%7Dtotal_count%7D%7D`;

export const GET_MEGAMENU = gql`
  query getMegaMenu($parentId: String!, $pageSize: Int!, $currentPage: Int!) {
    categories(
      filters: { parent_id: { eq: $parentId } }
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        uid
        name
        level
        url_path
        url_suffix
        children_count
        include_in_menu
        children {
          uid
          name
          level
          url_path
          url_suffix
          children_count
          include_in_menu
          children {
            uid
            name
            level
            url_path
            url_suffix
            children_count
            include_in_menu
          }
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
  }
`;
export const GET_CATEGORY_PRODUCTS = gql`
  query getCategoryProdcuts(
    $category_uid: String!
    $sort: ProductAttributeSortInput
  ) {
    products(
      filter: { category_uid: { eq: $category_uid } }
      sort: $sort
      pageSize: 20
      currentPage: 1
    ) {
      aggregations(filter: {}) {
        amshopby_filter_data {
          is_multiselect
          filter_code
          display_mode
          display_mode_label
          units_label
        }
        attribute_code
        count
        label
        options {
          count
          image
          value
          label
        }
        position
      }
      items {
        uid
        name
        sku
        url_key
        url_suffix
        only_x_left_in_stock
        special_price
        stock_status
        swatch_image
        __typename
        price_range {
          maximum_price {
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
        }
        image {
          label
          url
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      sort_fields {
        default
        options {
          label
          value
        }
      }
      suggestions {
        search
      }
      total_count
    }
  }
`;
export const CREATE_EMPTY_CUSTOMER_CART = gql`
  query {
    customerCart {
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
export const GET_SIMPLE_PRODUCT = gql`
  query getProduct($urlKey: String!) {
    products(
      filter: { url_key: { eq: $urlKey } }
      pageSize: 20
      currentPage: 1
      sort: {}
    ) {
      items {
        __typename
        name
        sku
        description {
          html
        }
        short_description {
          html
        }
        stock_status
        only_x_left_in_stock
        rating_summary
        review_count
        price_range {
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
          }
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
          }
        }
        # thumbnail {
        #   disabled
        #   label
        #   position
        #   url
        # }
        media_gallery {
          disabled
          label
          position
          url
        }
        related_products {
          name
          sku
          stock_status
          thumbnail {
            disabled
            label
            position
            url
          }
          price_range {
            maximum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
            }
            minimum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
            }
          }
          __typename
          url_key
          url_suffix
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
  }
`;
export const ADD_SIMPLE_PRODUCTS_TO_CART = gql`
  mutation AddSimpleProductsToCart(
    $cartId: String!
    $quantity: Float!
    $sku: String!
  ) {
    addSimpleProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: [{ data: { quantity: $quantity, sku: $sku } }]
      }
    ) {
      cart {
        total_quantity
        email
        id
        is_virtual
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
            price {
              currency
              value
            }
            row_total {
              currency
              value
            }
            total_item_discount {
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
          }
        }
        # order_gift_message
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
        billing_address {
          uid
          firstname
          lastname
          street
          city
          region {
            code
            region_id
            label
          }
          country {
            code
            label
          }
          postcode
          vat_id
          custom_attributes {
            attribute_code
            value
          }
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
        applied_coupons {
          code
        }
        selected_payment_method {
          code
          purchase_order_number
          title
        }
        available_payment_methods {
          code
          is_deferred
          title
        }
        gift_message {
          from
          message
          to
        }
      }
    }
  }
`;
