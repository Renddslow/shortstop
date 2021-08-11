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

const linkedKeys = ['touchbase', 'createdBy', 'owner', 'direct'];

const matchPeople = (data: Record<string, any>, people: Person[]) => {
  linkedKeys.forEach((key) => {
    if (data[key]) {
      const person = people.find(({ id }) => id === data[key]);
      data[key] = getLinkedData(person);
    }
  });
  return data;
};

export default matchPeople;
