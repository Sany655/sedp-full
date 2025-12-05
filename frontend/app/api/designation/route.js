import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_BASE_URL || process.env.BACKEND_URL || 'http://localhost:5000';

async function forwardJson(req, backendUrl, method = 'POST') {
  const token = cookies().get('auth_token')?.value;
  const body = await req.json().catch(() => ({}));

  const res = await fetch(backendUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  // try to parse JSON response, fallback to text
  let data;
  try {
    data = await res.json();
  } catch {
    data = { message: await res.text() };
  }

  return { res, data };
}

export async function POST(req) {
  try {
    const backendUrl = `${BACKEND}/api/event-types`;
    const { res, data } = await forwardJson(req, backendUrl, 'POST');

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || data?.msg || 'Failed to add event type' },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: data?.message || data?.msg || 'Event type added successfully', data: data?.data ?? data },
      { status: res.status }
    );
  } catch (err) {
    console.error('Server Error (POST /api/event-types):', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const jsonBody = await req.json().catch(() => ({}));
    const id = jsonBody.id || jsonBody._id;
    if (!id) {
      return NextResponse.json({ message: 'Event type ID is required' }, { status: 400 });
    }

    const backendUrl = `${BACKEND}/api/event-types/${encodeURIComponent(id)}`;
    const { res, data } = await forwardJson(req, backendUrl, 'PATCH');

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || data?.msg || 'Failed to update event type' },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: data?.message || data?.msg || 'Event type updated successfully', data: data?.data ?? data },
      { status: res.status }
    );
  } catch (err) {
    console.error('Server Error (PATCH /api/event-types):', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Event type ID is required' }, { status: 400 });
    }

    const token = cookies().get('auth_token')?.value;
    const backendUrl = `${BACKEND}/api/event-types/${encodeURIComponent(id)}`;

    const res = await fetch(backendUrl, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: await res.text() };
    }

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || data?.msg || 'Failed to delete event type' },
        { status: res.status }
      );
    }

    return NextResponse.json({ message: data?.message || data?.msg || 'Event type deleted', data: data?.data ?? data }, { status: res.status });
  } catch (err) {
    console.error('Server Error (DELETE /api/event-types):', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}