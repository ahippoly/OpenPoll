export const searchGroupByDescription = async (description: string) => {
  const query = `
    query ExampleQuery($where: Group_filter) {
      groups(where: $where) {
        description
        id
        name
        specs
        latestSnapshot {
          valueDistribution {
            numberOfAccounts
          }
        }
      }
    }`

  const variables = {
    where: {
      description_contains: description,
    },
  }

  return fetchSismo(query, variables)
}

export const searchGroupBySpecs = async (specs: string) => {
  const query = `
    query ExampleQuery($where: Group_filter) {
      groups(where: $where) {
        description
        id
        name
        specs
        latestSnapshot {
          valueDistribution {
            numberOfAccounts
          }
        }
      }
    }`

  const variables = {
    where: {
      specs_contains: specs,
    },
  }

  return fetchSismo(query, variables)
}

export const searchGroupByName = async (name: string) => {
  const query = `
      query ExampleQuery($where: Group_filter) {
        groups(where: $where) {
          description
          id
          name
          specs
          latestSnapshot {
            valueDistribution {
              numberOfAccounts
            }
          }
        }
      }
      `

  const variables = {
    where: {
      name_contains: name,
    },
  }

  return fetchSismo(query, variables)
}

export const searchGroupById = async (id: string) => {
  const query = `
        query ExampleQuery($where: Group_filter) {
          groups(where: $where) {
            description
            id
            name
            specs
          }
        }
        `

  const variables = {
    where: {
      id,
    },
  }

  return fetchSismo(query, variables)
}

const fetchSismo = async (query: string, variables: object) => {
  const res = await fetch('https://api.sismo.io', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })
  const { data, errors } = await res.json()
  const groups : SismoGroup[] = data.groups.map((group: any) => ({
    description: group.description,
    id: group.id,
    name: group.name,
    specs: group.specs,
    numberOfAccounts: group.latestSnapshot?.valueDistribution[0]?.numberOfAccounts,
  }))

  return { groups, errors }
}
