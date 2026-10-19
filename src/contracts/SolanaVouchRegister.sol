// SPDX-License-Identifier: LGPL-3.0-or-later
pragma solidity ^0.8;

/// @title SolanaVouchRegister
/// @notice Mainnet-only register through which bonding pools vouch for Solana solvers.
/// @dev Solana addresses are 32-byte ed25519 public keys and are passed as raw `bytes32`
/// (i.e. the base58-decoded public key), not as base58 strings.
contract SolanaVouchRegister {
    event Vouch(
        bytes32 indexed solver,
        address indexed bondingPool,
        address cowRewardTarget,
        bytes32 solanaRewardTarget,
        address indexed sender
    );
    event InvalidateVouch(
        bytes32 indexed solver,
        address indexed bondingPool,
        address indexed sender
    );

    constructor() {}

    /// @dev Allows a bonding pool to officially vouch for a Solana solver
    /// Anyone can call this function, but only the events where the sender is the owner
    /// of the referenced bondingPool will be officially indexed
    /// The owner of a bonding pool is identified by the address sending the full initial funding to the bonding pool
    /// @param solver The Solana address (32-byte public key) of the solver for whom the bonding pool will cover potential losses/penalities
    /// @param bondingPool Address of the bonding pool from which a potential loss will be covered
    /// @param cowRewardTarget Address to which the solver COW Token reward should be send for the particular solver
    /// @param solanaRewardTarget Solana address (32-byte public key) to which Solana native payments should be send for the particular solver
    function vouch(
        bytes32[] calldata solver,
        address[] calldata bondingPool,
        address[] calldata cowRewardTarget,
        bytes32[] calldata solanaRewardTarget
    ) public {
        for (uint256 i = 0; i < solver.length; i++) {
            emit Vouch(
                solver[i],
                bondingPool[i],
                cowRewardTarget[i],
                solanaRewardTarget[i],
                msg.sender
            );
        }
    }

    /// @dev Invalidates the vouching for a Solana solver by a bonding pool
    /// Anyone can call this function, but only the events where the sender is the owner
    /// of the referenced bondingPool will be officially indexed
    /// The owner of a bonding pool is identified by the address sending the full initial funding to the bonding pool
    /// @param solver The Solana address (32-byte public key) of the solver for whom the bonding pool will no longer cover any losses/penalities
    /// @param bondingPool Address of the official bonding pool, from which a potential loss will no longer be covered
    function invalidateVouching(
        bytes32[] calldata solver,
        address[] calldata bondingPool
    ) public {
        for (uint256 i = 0; i < solver.length; i++) {
            emit InvalidateVouch(solver[i], bondingPool[i], msg.sender);
        }
    }
}
