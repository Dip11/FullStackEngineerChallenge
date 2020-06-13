"""initial_database

Revision ID: ae255c2cc96c
Revises: 
Create Date: 2020-06-11 22:24:25.394569

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ae255c2cc96c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('client',
    sa.Column('name', sa.String(length=40), nullable=True),
    sa.Column('client_id', sa.String(length=40), nullable=False),
    sa.Column('client_secret', sa.String(length=55), nullable=False),
    sa.Column('client_type', sa.String(length=20), nullable=True),
    sa.Column('_redirect_uris', sa.Text(), nullable=True),
    sa.Column('_default_scopes', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('client_id')
    )
    op.create_index(op.f('ix_client_client_secret'), 'client', ['client_secret'], unique=True)
    op.create_table('performance_phrases',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('tag', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('roles',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=True),
    sa.Column('first_name', sa.String(length=255), nullable=True),
    sa.Column('last_name', sa.String(length=255), nullable=True),
    sa.Column('role', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['role'], ['roles.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('assigned_employee_for_reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('assigned_employee', sa.Integer(), nullable=True),
    sa.Column('assigned_for_employee', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['assigned_employee'], ['users.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['assigned_for_employee'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('employee_to_reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('reviewed', sa.Integer(), nullable=True),
    sa.Column('reviewed_by', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['reviewed'], ['users.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['reviewed_by'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('grant',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('client_id', sa.String(length=40), nullable=False),
    sa.Column('code', sa.String(length=255), nullable=False),
    sa.Column('redirect_uri', sa.String(length=255), nullable=True),
    sa.Column('expires', sa.DateTime(), nullable=True),
    sa.Column('scope', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['client_id'], ['client.client_id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_grant_code'), 'grant', ['code'], unique=False)
    op.create_table('token',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('client_id', sa.String(length=40), nullable=False),
    sa.Column('token_type', sa.String(length=40), nullable=True),
    sa.Column('access_token', sa.String(length=255), nullable=True),
    sa.Column('refresh_token', sa.String(length=255), nullable=True),
    sa.Column('expires', sa.DateTime(), nullable=True),
    sa.Column('scope', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['client_id'], ['client.client_id'], name='token_client_id_fk', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='token_user_id_fk', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('token')
    op.drop_index(op.f('ix_grant_code'), table_name='grant')
    op.drop_table('grant')
    op.drop_table('employee_to_reviews')
    op.drop_table('assigned_employee_for_reviews')
    op.drop_table('users')
    op.drop_table('roles')
    op.drop_table('performance_phrases')
    op.drop_index(op.f('ix_client_client_secret'), table_name='client')
    op.drop_table('client')
    # ### end Alembic commands ###