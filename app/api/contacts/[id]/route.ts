import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Contact from "../../../../models/contact";


export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {

    const {id} = params;

    try {
        await connectMongoDB();
        const {name, email, phoneNumber, postalCode, address} = await request.json();
        await Contact.findByIdAndUpdate(id, {name, email, phoneNumber, postalCode, address})

        return NextResponse.json({message: "Contato atualizado com sucesso!"}, { status: 201 })
    } catch (error) {
        return NextResponse.json({message: error})
    }
}

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    
    const {id} = params;

    try {
        await connectMongoDB();
        const contact = await Contact.findOne({_id: id});

        return NextResponse.json({contact}, { status: 201 })
    } catch (error) {
        return NextResponse.json({message: error})
    }
}
