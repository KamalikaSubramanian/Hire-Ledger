export async function getApplications() {
  const response = await fetch("/api/applications");

  return response.json();
}