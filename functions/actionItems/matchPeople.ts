export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const getLinkedData = (person: Person) => ({
  id: person.id,
  firstName: person.firstName,
  lastName: person.lastName,
  email: person.email,
});

const matchPeople = (data: Record<string, any>, people: Person[]) => {
  data.touchbase = getLinkedData(people.find(({ id }) => id === data.touchbase));
  data.createdBy = getLinkedData(people.find(({ id }) => id === data.createdBy));
  return data;
};

export default matchPeople;
