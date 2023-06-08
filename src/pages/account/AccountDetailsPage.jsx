import { useUser } from "../../hooks/auth";


export default function AccountDetailsPage()
{
    const { user } = useUser()

    return (
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure porro aspernatur dolore. Deleniti, praesentium fugiat assumenda perferendis similique nostrum consectetur voluptas beatae, numquam commodi quo nemo repellendus doloribus quod perspiciatis.

            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita similique labore, quas odit adipisci exercitationem vel hic nobis atque non nihil officia ducimus nesciunt dignissimos quibusdam iste. Quidem, magni amet.
        </div>
    )
}
