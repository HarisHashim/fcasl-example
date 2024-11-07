import { Ability, AbilityBuilder, createAliasResolver } from "@casl/ability";

// don't forget this, as `read` is used internally
const resolveAction = createAliasResolver({
  update: "patch", // define the same rules for update & patch
  read: ["get", "find"], // use 'read' as a equivalent for 'get' & 'find'
  delete: "remove" // use 'delete' or 'remove'
});

export const defineRulesFor = (user) => {
  console.log('defineRulsFor') //'user', JSON.stringify( user,null, '\tab'));

  // also see https://casl.js.org/v6/en/guide/define-rules
  const { can, cannot, rules } = new AbilityBuilder(Ability);

  if (user.role && user.role.name === "super") {
    // SuperAdmin can do evil
    can("manage", "all");
    return rules;
  }

  if (user.role && user.role.name === "admin") {
    can("create", "users");
  }

  can("read", "users");
  can("update", "users", { id: user.id });
  cannot("update", "users", ["roleId"], { id: user.id });
  cannot("delete", "users", { id: user.id });

  return rules;
};

export const defineAbilitiesFor = (user) => {
  const rules = defineRulesFor(user);

  return new Ability(rules, { resolveAction });
};