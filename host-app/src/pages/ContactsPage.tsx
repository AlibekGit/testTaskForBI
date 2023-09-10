import React, { Suspense, lazy, useState } from "react";

const contacts = [
  {
    id: 1,
    name: "Иван Иванов",
    email: "ivan@example.com",
    phone: "+1 (123) 456-7890",
  },
  {
    id: 2,
    name: "Мария Петрова",
    email: "maria@example.com",
    phone: "+1 (987) 654-3210",
  },
  {
    id: 3,
    name: "Алексей Сидоров",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
  },
];

export const ContactsPage = () => {
  const [wantSign, setWantSign] = useState(false);
  // using micro-front
  const NCAForm = lazy(() => import("remote_form/NCAForm"));

  return (
    <div className="my-4">
      <h1 className="text-center mb-4 text-2xl">Список контактов</h1>
      <ul className="flex gap-x-5 justify-center mb-4">
        {contacts.map((contact) => (
          <li className="p-3 rounded-xl bg-gray-50" key={contact.id}>
            <strong>{contact.name}</strong>
            <p>Email: {contact.email}</p>
            <p>Телефон: {contact.phone}</p>
          </li>
        ))}
      </ul>
      {wantSign ? (
        <Suspense fallback={<div>Loading ...</div>}>
          <NCAForm />
        </Suspense>
      ) : (
        <div className="text-center">
          <p className="mb-2">Хотите подписать?</p>
          <button
            className="bg-gray-200 py-2 px-3 rounded-lg"
            onClick={() => setWantSign(true)}
          >
            Продолжить
          </button>
        </div>
      )}
    </div>
  );
};
