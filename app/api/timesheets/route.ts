import { NextResponse } from "next/server";
import { TimesheetService } from "@/services/TimesheetService";

export async function GET() {
  const data = TimesheetService.getAll();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // basic validation
    if (!body.weekNumber || !body.date) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const created = TimesheetService.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id)
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const updated = TimesheetService.update(body.id, body);
    if (!updated)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    if (!body.id)
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const removed = TimesheetService.remove(body.id);
    if (!removed)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
