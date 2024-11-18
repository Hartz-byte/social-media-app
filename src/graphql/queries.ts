import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    users_info {
      edges {
        node {
          username
          profile_pic_url
          quote
        }
      }
    }
  }
`;
