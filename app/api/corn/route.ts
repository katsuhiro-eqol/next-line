import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest): NextResponse {
    const date = new Date().toISOString
    console.log(date)
    return NextResponse.json({token:date})
}