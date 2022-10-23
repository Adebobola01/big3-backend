const Moralis = require("moralis").default;

exports.getDemoData = async (address, tokenId, chain) => {
    const response = await Moralis.EvmApi.nft.getNFTMetadata({
        address,
        chain,
        tokenId,
    });
    return response.data.metadata;
};

exports.getNfts = async (address, chain) => {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
    });

    return response;
};
