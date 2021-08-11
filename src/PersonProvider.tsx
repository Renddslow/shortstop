import { h, createContext, ComponentChildren } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

type Person = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  direct: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  };
};

type Ctx = {
  person: Person;
  loading: boolean;
};

type Props = {
  personID: string;
  children: ComponentChildren;
};

const PersonCtx = createContext<Partial<Ctx>>({});

const PersonProvider = ({ personID, children }: Props) => {
  const [person, setPerson] = useState<Partial<Person>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/people/${personID}`)
      .then((d) => d.json())
      .then((d) => {
        setPerson({
          id: d.data.id,
          ...d.data.attributes,
        });
        setLoading(false);
      });
  }, []);

  return (
    <PersonCtx.Provider
      value={{
        loading,
        person: person as Person,
      }}
    >
      {children}
    </PersonCtx.Provider>
  );
};

export const usePerson = () => {
  const { person } = useContext(PersonCtx);
  return person;
};

export default PersonProvider;
