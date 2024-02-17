import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb"
import Contact from "../../../models/contact";

export async function POST(request: NextRequest) {

    try {
        await connectMongoDB();
        const {name, email, phoneNumber, postalCode, address} = await request.json();
        await Contact.create({name, email, phoneNumber, postalCode, address})

        return NextResponse.json({message: "Contato criado com sucesso!"}, { status: 201 })
    } catch (error) {
        return NextResponse.json({message: error})
    }
   
}

export async function GET() {
    try {
        await connectMongoDB();
        const contacts = await Contact.find();

        return NextResponse.json({contacts})
    } catch (error) {
        return NextResponse.json({message: error})
    }
}

export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id")

    try {
        await connectMongoDB();
        await Contact.findByIdAndDelete(id)
        return NextResponse.json({message: "Contato deletado com sucesso!"}, { status: 201 })
    } catch (error) {
        return NextResponse.json({message: error})
    }
}