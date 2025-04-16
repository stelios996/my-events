import {QueryClient} from "@tanstack/react-query";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const queryClient = new QueryClient();

export const getAllEvents = async ({signal}) => {
  const response = await fetch(`${backendBaseUrl}events`, {signal});
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);

  return await response.json();
};

export const getEventsByMonth = async ({signal, queryKey}) => {
  const [_, start, end] = queryKey;
  const payload = {start, end};

  const response = await fetch(`${backendBaseUrl}events/byMonth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal
  });
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);

  return await response.json();
};

export const getEvent = async ({id, signal}) => {
  const response = await fetch(`${backendBaseUrl}events/${id}`, {signal});
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);

  return await response.json();
};

export const addEvent = async (formData) => {
  const response = await fetch(`${backendBaseUrl}events`, {
    method: 'POST',
    body: formData
  });
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);

  return await response.json();
};

export const updateEvent = async (id, formData) => {
  const response = await fetch(`${backendBaseUrl}events/${id}`, {
    method: 'PUT',
    body: formData
  });
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);

  return await response.json();
};

export const deleteEvent = async (id) => {
  const response = await fetch(`${backendBaseUrl}events/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);

  return await response.json();
};