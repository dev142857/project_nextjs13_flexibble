export const getProjectsQuery = (category: string | null, startCursor: string | null, endCursor: string | null) => {
  let query = `projectSearch(`;
  
  if (startCursor) {
    query += `last: 20, before: "${startCursor}"`;
  } else if (endCursor) {
    query += `first: 20, after: "${endCursor}"`;
  } else {
    query += `first: 20`;
  }

  if (category) {
    query += `, filter: { category: { eq: "${category}" } }`;
  }

  query += ')';

  return `{
    ${query} {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          createdBy {
            id
            email
            name
            avatarUrl
          }
          category
        }
      }
    }
  }`;
};


export const getProjectsQueryNew = ({ category, cursor }: { category: string | null, cursor: string | null }) => {
  // let query = `projectCollection(last: 6`;

  // if (cursor !== "null") {
  //   query += `, after: "${cursor}"`
  // }

  // if (category !== "null") {
  //   query += `, filter: { category: { eq: "${category}" } }`;
  // }

  // query += ')';
  
  return `{
    projectCollection(last: 10) {
      edges {
        node {
          title
          description
          id
          image
          category
          liveSiteUrl
          githubUrl
          createdBy {
            name
            email
            id
            avatarUrl
          }
        }
      }
    }
  }`

  // return `
  //   projectCollection(last: 6) {
  //     edges { 
  //       node {
  //         title
  //         description
  //         image
  //         githubUrl
  //         liveSiteUrl
  //         id
  //         updatedAt
  //         createdAt
  //         category
  //         createdBy {
  //           name
  //           email
  //           id
  //           avatarUrl
  //         }
  //       }
  //     }
  //     pageInfo {
  //       hasPreviousPage
  //       hasNextPage
  //       startCursor
  //       endCursor
  //     }
  // }`
}

export const getProjectByIdQuery = (id: string) => {
  return `{
    project(by: { id: "${id}" }) {
      id
      title
      description
      image
      liveSiteUrl
      githubUrl
      likes
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }`
}

export const getProjectsOfUserQuery = (id: string, last: number = 5, cursor?: string | null) => {
  let query = `{
    user(by: {id: "${id}"}) {
      id
      name
      email
      description
      avatarUrl
      githubUrl
      linkedinUrl
      projects(last: ${last}`;

  if (cursor) {
    query += `, before: "${cursor}"`;
  }

  query += `) {
        edges {
          node {
            id
            title
            image
          }
        },
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }`;

  return query;
};

export const getUserQuery = (email: string) => {
  return `{
        user(by: {email: "${email}"}) {
            id
            name
            email
            avatarUrl
            description
            githubUrl
            linkedinUrl
        }
    }`
}