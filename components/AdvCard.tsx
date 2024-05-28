'use client'
import {Card, CardBody} from "@chakra-ui/react";
import {Post} from "@prisma/client";
import Image from "next/image";
import React from 'react';

const AdvCard = ({post}: { post: Post }) => {
  return (
    <Card className="mb-2">
      <CardBody className="flex">
        <div className='aspect-square w-24 h-24 relative'>
          <Image src={post.preview} fill alt='' style={{objectFit: 'cover'}}/>
        </div>
        <div>
          <h1>{post.description}</h1>
          <p>Цена: {post.price}</p>
          {/*<p className='truncate'>Более развернутая информация будет в карточке</p>*/}
        </div>
      </CardBody>
    </Card>
  );
};

export default AdvCard;
