import {cookies} from "next/headers";
import {EnumTokens} from "@/services/auth.service";
import {API_URL} from "@/constants";

const fetchProfile = async () => {
    'use server'

    const cookie = cookies();
    const accessToken = cookie.get(EnumTokens.ACCESS_TOKEN)?.value;

    return fetch(`${API_URL}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).then(res => res.json());
}

export default async function ProfilePage() {
    const profile = await fetchProfile();

    return (
        <div>
            {profile ? (
                <>
                    <h1>Profile</h1>
                    <p>{profile.email}</p>
                </>
            ) : (
                <p>Not found!</p>
            )}
        </div>
    );
};