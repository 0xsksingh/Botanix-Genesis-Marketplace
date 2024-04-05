import React, { useState } from "react";
import Container from "../components/Container/Container";
import { Box, Button, TextField, IconButton } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../util/toastConfig";
import fleek from '@fleekhq/fleek-storage-js';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useAddress, useContract, useMintNFT } from "@thirdweb-dev/react";

interface Attribute {
  trait_type: string;
  value: string;
}

export default function Component() {
  const { contract } = useContract("0x3854AECCFacb32A828632276ed2744CEC48CEE26");
  const { mutate: mintNft, isLoading } = useMintNFT(contract);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const address = useAddress();

  const handleAddAttribute = () => {
    setAttributes([...attributes, { trait_type: "", value: "" }]);
  };

  const handleRemoveAttribute = (index: number) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  const handleAttributeChange = (index: number, key: keyof Attribute, value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index][key] = value;
    setAttributes(newAttributes);
  };

  const uploadimage = async (metadata: any) => {
    const input = {
      apiKey: process.env.NEXT_PUBLIC_STORAGE_API_KEY!,
      apiSecret: process.env.NEXT_PUBLIC_STORAGE_SECRET!,
      key: `mintingnfts/usinggfleek`,
      data: metadata.image,
    };

    const result = await fleek.upload(input);
    console.log(result, "fleek uploaded nft");

    return result;
  };

  const handleMint = () => {
    const metadata = {
      name,
      description,
      image,
      attributes,
    };

    const fleekimage= uploadimage(metadata);

    const updatedmetadata = {
      ...metadata,
      image: fleekimage
    };

    mintNft({
      updatedmetadata,
      // @ts-ignore
      to: address,
    });

    toast(`NFT Minted Successfully`, {
      icon: "✅",
      style: toastStyle,
      position: "bottom-center",
    });

  };

  return (
    <Container maxWidth="lg">
      <Toaster position="bottom-center" reverseOrder={false} />
      <h1>Tokenize your Botanix Asset as an NFT</h1>
      <form className="space-y-4 my-4 text-white">
        <Box>
          <div className="mb-4">
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-400 rounded px-2 py-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-400 rounded px-2 py-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Image URL:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-400 rounded px-2 py-1"
            />
          </label>
        </div>
        </Box>
        {attributes.map((attribute, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              label="Trait Type"
              variant="outlined"
              value={attribute.trait_type}
              color="success"
              onChange={(e) => handleAttributeChange(index, 'trait_type', e.target.value)}
            />
            <TextField
              label="Value"
              variant="outlined"
              value={attribute.value}
              onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
            />
            <IconButton onClick={() => handleRemoveAttribute(index)} color="error">
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddAttribute}>
          Add Attribute
        </Button>
        <div className="flex justify-center">
        <button disabled={isLoading} onClick={handleMint} className="text-center border-4 border-sky-500 p-2">
          Mint!
        </button>
      </div>
      </form>
    </Container>
  );
}
