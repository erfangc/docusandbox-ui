import {useEffect, useState} from "react";
import {PrimaryButton} from "./Template";
import {useNavigate, useParams} from "react-router-dom";

interface UserProfileType {
    email?: string
    name?: string
    ownership?: number
    dayPhone?: string
    eveningPhone?: string
    address?: Address
    birthDate?: string
    sex: 'MALE' | 'FEMALE'
}

interface Address {
    line1: string
    line2: string
    zipCode: string
    state: string
    city: string
    country: string
}

export function UserProfile() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [ownership, setOwnership] = useState<number | undefined>();
    const [dayPhone, setDayPhone] = useState('');
    const [eveningPhone, setEveningPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [sex, setSex] = useState<'MALE' | 'FEMALE'>('MALE');

    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const emailParam = params['email'];

    useEffect(() => {
        if (emailParam) {
            fetch(`/api/user-profiles/${emailParam}`)
                .then(resp => resp.json())
                .then(json => {
                    setBirthDate(json['birthDate']);
                    setDayPhone(json['dayPhone']);
                    setEmail(json['email']);
                    setEveningPhone(json['eveningPhone']);
                    setName(json['name']);
                    setSex(json['sex']);
                    setOwnership(json['ownership']);

                    setLine1(json['address']?.line1);
                    setLine2(json['address']?.line2);
                    setZipCode(json['address']?.zipCode);
                    setState(json['address']?.state);
                    setCity(json['address']?.city);
                    setCountry(json['address']?.country);
                })
                .catch(reason => alert(reason));
        }
    }, [emailParam]);

    const createUserProfile = () => {
        const address = {
            city, line2, line1, country, state, zipCode
        };
        const userProfile: UserProfileType = {
            birthDate,
            dayPhone,
            email,
            eveningPhone,
            name,
            sex,
            ownership,
            address,
        };
        setLoading(true);
        fetch(`/api/user-profiles`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userProfile),
        })
            .then(_ => navigate(`/user-profiles/${email}`))
            .catch(reason => alert(reason))
            .finally(() => setLoading(false));
    };

    return (
        <div className="container mx-auto my-20 max-w-2xl">
            <form>
                <div>
                    <h1 className="text-2xl mb-6 mt-12">Basic Info</h1>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-6">
                        <label>
                            <p>Email</p>
                            <input type="email" name="email" value={email}
                                   onChange={e => setEmail(e.currentTarget.value)}/>
                        </label>
                        <label>
                            <p>Name</p>
                            <input type="text" name="name" value={name} onChange={e => setName(e.currentTarget.value)}/>
                        </label>
                        <label>
                            <p>Ownership</p>
                            <input type="number" name="ownership" value={ownership}
                                   onChange={e => setOwnership(parseFloat(e.currentTarget.value))}/>
                        </label>
                        <label>
                            <p>Day Phone</p>
                            <input type="text" name="dayPhone" value={dayPhone}
                                   onChange={e => setDayPhone(e.currentTarget.value)}/>
                        </label>
                        <label>
                            <p>Evening Phone</p>
                            <input type="text" name="eveningPhone" value={eveningPhone}
                                   onChange={e => setEveningPhone(e.currentTarget.value)}/>
                        </label>
                        <label>
                            <p>Birth Date</p>
                            <input type="text" name="birthday" value={birthDate}
                                   onChange={e => setBirthDate(e.currentTarget.value)}/>
                        </label>
                        <label>
                            <p>Sex</p>
                            <select name="sex" value={sex} onChange={e => setSex(e.currentTarget.value as any)}>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl mb-6 mt-12">Address</h1>
                    <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                        <label className="col-span-6">
                            <p>Line1</p>
                            <input className="w-full" type="text" name="address_line1" value={line1}
                                   onChange={e => setLine1(e.currentTarget.value)}/>
                        </label>
                        <label className="col-span-6">
                            <p>Line2</p>
                            <input className="w-full" type="text" name="address_line2" value={line2}
                                   onChange={e => setLine2(e.currentTarget.value)}/>
                        </label>
                        <label className="col-span-4">
                            <p>Zip Code</p>
                            <input className="w-full" type="text" name="zipCode" value={zipCode}
                                   onChange={e => setZipCode(e.currentTarget.value)}/>
                        </label>
                        <label className="col-span-2">
                            <p>State</p>
                            <input className="w-full" type="text" name="state" value={state}
                                   onChange={e => setState(e.currentTarget.value)}/>
                        </label>
                        <label className="col-span-3">
                            <p>City</p>
                            <input className="w-full" type="text" name="city" value={city}
                                   onChange={e => setCity(e.currentTarget.value)}/>
                        </label>
                        <label className="col-span-3">
                            <p>Country</p>
                            <input className="w-full" type="text" name="country" value={country}
                                   onChange={e => setCountry(e.currentTarget.value)}/>
                        </label>
                    </div>
                </div>
            </form>
            <div className="mt-12">
                <PrimaryButton onClick={createUserProfile} disabled={loading}>
                    {loading ? 'Loading ...' : `${emailParam ? 'Save' : 'Create'} User Profile`}
                </PrimaryButton>
            </div>
        </div>
    );
}