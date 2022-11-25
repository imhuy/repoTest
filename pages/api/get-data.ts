// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    fs.readFile('./utils/fakeData.txt', { encoding: 'utf8' }, (err, data) => {
        res.status(200).json({ name: JSON.parse(data) })
    })
}
