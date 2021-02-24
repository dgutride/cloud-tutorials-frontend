/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
import gql from 'graphql-tag';

export const GET_TOPICS = gql`
  query Topics($filter: String) {
    topicList(search: $filter) {
      items {
        name
        partitions {
          partition
          replicas {
            id
          }
        }
      }
    }
  }
`;

export const CREATE_TOPIC = gql`
  mutation CreateTopic($topic: NewTopic!) {
    createTopic(input: $topic) {
      name
      partitions {
        partition
      }
    }
  }
`;
