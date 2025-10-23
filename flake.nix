{
	inputs = {
		nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
		hooks = {
			url = "github:cachix/git-hooks.nix";
			inputs.nixpkgs.follows = "nixpkgs";
		};
	};

	outputs = {
		self,
		nixpkgs,
		hooks,
	}: let
		systems = ["x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin"];
		forAllSystems = f:
			nixpkgs.lib.genAttrs systems (system:
					f rec {
						pkgs = nixpkgs.legacyPackages.${system};
						inherit system;
					});
	in {
		devShells =
			forAllSystems ({
					pkgs,
					system,
				}: {
					default =
						pkgs.mkShell {
							inherit (self.checks.${system}.pre-commit) shellHook;

							packages =
								builtins.attrValues {
									inherit (pkgs.nodePackages) nodejs pnpm typescript typescript-language-server;
								}
								++ self.checks.${system}.pre-commit.enabledPackages;
						};
				});

		checks =
			forAllSystems ({
					pkgs,
					system,
				}: {
					pre-commit =
						hooks.lib.${system}.run {
							src = ./.;

							hooks = {
								eslint = {
									enable = true;
									entry = "pnpm run -r lint";
									files = "^packages/.*\\.(ts|js|tsx|jsx)$";
									pass_filenames = false;
								};

								prettier = {
									enable = true;
									excludes = ["flake.lock"];
								};

								statix = {
									enable = true;
									settings.ignore = ["/.direnv"];
								};

								convco.enable = true;
								alejandra.enable = true;
							};
						};
				});

		formatter = forAllSystems ({pkgs, ...}: pkgs.alejandra);
	};
}
